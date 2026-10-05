import { defineQuery } from "next-sanity";

// Shared projection for job lists (cards). Kept as a plain string so TypeGen
// can inline it in the queries below.
const JOB_CARD_FIELDS = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  available,
  province,
  city,
  modality,
  workingDay,
  salary,
  "categories": categories[]->{ _id, name },
  "company": company->{ name, "slug": slug.current, logo }
`;

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings" && _id == "siteSettings"][0]{
    title,
    description,
    logo,
    navigation[]{ _key, label, href }
  }
`);

// $province is null for "all provinces".
export const JOBS_PAGE_QUERY = defineQuery(`
  *[_type == "job" && defined(slug.current) && ($province == null || province == $province)]
    | order(publishedAt desc) [$start...$end]{ ${JOB_CARD_FIELDS} }
`);

export const JOBS_COUNT_QUERY = defineQuery(`
  count(*[_type == "job" && defined(slug.current) && ($province == null || province == $province)])
`);

export const JOB_PROVINCES_QUERY = defineQuery(`
  *[_type == "job" && defined(slug.current)].province
`);

export const JOBS_BY_IDS_QUERY = defineQuery(`
  *[_type == "job" && _id in $ids && defined(slug.current)]{ ${JOB_CARD_FIELDS} }
`);

export const JOB_QUERY = defineQuery(`
  *[_type == "job" && slug.current == $slug][0]{
    ${JOB_CARD_FIELDS},
    _updatedAt,
    description,
    tasks,
    mandatoryRequirements,
    optionalRequirements,
    benefits,
    "contactEmail": coalesce(contactEmail, company->contactEmail),
    seo
  }
`);

export const JOB_SLUGS_QUERY = defineQuery(`
  *[_type == "job" && defined(slug.current)]{ "slug": slug.current, _updatedAt }
`);

export const COMPANIES_QUERY = defineQuery(`
  *[_type == "company" && defined(slug.current)] | order(name asc){
    _id,
    name,
    "slug": slug.current,
    logo
  }
`);

export const COMPANY_QUERY = defineQuery(`
  *[_type == "company" && slug.current == $slug][0]{
    _id,
    name,
    "slug": slug.current,
    logo,
    website,
    contactEmail,
    description,
    seo,
    "jobs": *[_type == "job" && references(^._id) && defined(slug.current)]
      | order(publishedAt desc){ ${JOB_CARD_FIELDS} }
  }
`);

export const COMPANY_SLUGS_QUERY = defineQuery(`
  *[_type == "company" && defined(slug.current)]{ "slug": slug.current, _updatedAt }
`);
