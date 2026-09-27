/**
 * Seeds the dataset with mock jobs, companies and categories.
 *
 *   pnpm seed            (from the repo root or studio/)
 *
 * Runs through `sanity exec --with-user-token`, so it uses the account you are
 * logged in with in the Sanity CLI. It is idempotent: documents whose slug
 * already exists are reused, not duplicated.
 */
import {randomUUID} from 'node:crypto'
import {getCliClient} from 'sanity/cli'

import {categories, companies, jobs, siteSettings} from './data'

const client = getCliClient({apiVersion: '2026-09-01'})

const key = () => randomUUID().replaceAll('-', '').slice(0, 12)

const slugify = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const toBlocks = (paragraphs: string[]) =>
  paragraphs.map((text) => ({
    _type: 'block',
    _key: key(),
    style: 'normal',
    markDefs: [],
    children: [{_type: 'span', _key: key(), text, marks: []}],
  }))

const daysAgo = (days: number) => new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()

async function findIdBySlug(type: string, slug: string): Promise<string | null> {
  return client.fetch<string | null>(`*[_type == $type && slug.current == $slug][0]._id`, {
    type,
    slug,
  })
}

async function ensure(type: string, slug: string, create: () => Promise<Record<string, unknown>>) {
  const existing = await findIdBySlug(type, slug)
  if (existing) {
    console.log(`  = ${type} ${slug}`)
    return existing
  }
  const doc = await client.create({_type: type, ...(await create())})
  console.log(`  + ${type} ${slug}`)
  return doc._id
}

async function uploadUnsplash(photoId: string, filename: string) {
  const url = `https://images.unsplash.com/photo-${photoId}?w=600&h=600&fit=crop&fm=jpg&q=80`
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Could not download ${url}: ${response.status}`)
  const buffer = Buffer.from(await response.arrayBuffer())
  const asset = await client.assets.upload('image', buffer, {
    filename,
    source: {name: 'unsplash', id: photoId, url: `https://unsplash.com/photos/${photoId}`},
  })
  return asset._id
}

async function main() {
  const {projectId, dataset} = client.config()
  console.log(`Seeding ${projectId}/${dataset}`)

  console.log('Categories')
  const categoryIds = new Map<string, string>()
  for (const category of categories) {
    const slug = slugify(category.name)
    const id = await ensure('jobCategory', slug, async () => ({
      name: category.name,
      slug: {_type: 'slug', current: slug},
    }))
    categoryIds.set(category.key, id)
  }

  console.log('Companies')
  const companyIds = new Map<string, string>()
  for (const company of companies) {
    const slug = slugify(company.name)
    const id = await ensure('company', slug, async () => ({
      name: company.name,
      slug: {_type: 'slug', current: slug},
      contactEmail: company.contactEmail,
      website: company.website,
      description: toBlocks(company.description),
      logo: {
        _type: 'image',
        alt: company.logoAlt,
        asset: {_type: 'reference', _ref: await uploadUnsplash(company.unsplashId, `${slug}.jpg`)},
      },
    }))
    companyIds.set(company.key, id)
  }

  console.log('Jobs')
  for (const job of jobs) {
    const companyId = companyIds.get(job.company)
    if (!companyId) throw new Error(`Unknown company "${job.company}" in job "${job.title}"`)
    const slug = slugify(`${job.title} ${job.city}`)
    await ensure('job', slug, async () => ({
      title: job.title,
      slug: {_type: 'slug', current: slug},
      company: {_type: 'reference', _ref: companyId},
      publishedAt: daysAgo(job.daysAgo),
      available: job.available,
      categories: job.categories.map((categoryKey) => {
        const ref = categoryIds.get(categoryKey)
        if (!ref) throw new Error(`Unknown category "${categoryKey}" in job "${job.title}"`)
        return {_type: 'reference', _ref: ref, _key: key()}
      }),
      description: toBlocks(job.description),
      province: job.province,
      city: job.city,
      modality: job.modality,
      workingDay: job.workingDay,
      salary: job.salary,
      tasks: job.tasks,
      mandatoryRequirements: job.mandatoryRequirements,
      optionalRequirements: job.optionalRequirements,
      benefits: job.benefits,
    }))
  }

  console.log('Site settings')
  // Singleton: fixed id, matches the Studio structure.
  await client.createIfNotExists({
    _id: 'siteSettings',
    _type: 'siteSettings',
    title: siteSettings.title,
    description: siteSettings.description,
    navigation: siteSettings.navigation.map((item) => ({_type: 'navItem', _key: key(), ...item})),
  })

  console.log('Done')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
