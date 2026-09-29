import { sanityFetch } from "./live";
import {
  COMPANIES_QUERY,
  COMPANY_QUERY,
  COMPANY_SLUGS_QUERY,
  JOB_PROVINCES_QUERY,
  JOB_QUERY,
  JOB_SLUGS_QUERY,
  JOBS_COUNT_QUERY,
  JOBS_PAGE_QUERY,
  SITE_SETTINGS_QUERY,
} from "./queries";

// CMS-facing API used by web/. Another CMS package can implement the same
// functions so web/modules/cms only needs to change its import.

export async function getSiteSettings() {
  const { data } = await sanityFetch({ query: SITE_SETTINGS_QUERY });
  return data;
}

export async function getJobsPage({
  page,
  pageSize,
  province = null,
}: {
  page: number;
  pageSize: number;
  province?: string | null;
}) {
  const start = (page - 1) * pageSize;
  const [{ data: jobs }, { data: total }] = await Promise.all([
    sanityFetch({ query: JOBS_PAGE_QUERY, params: { start, end: start + pageSize, province } }),
    sanityFetch({ query: JOBS_COUNT_QUERY, params: { province } }),
  ]);
  return { jobs, total, totalPages: Math.max(1, Math.ceil(total / pageSize)) };
}

// Number of published jobs per province name. Never stega-encoded: the names
// are used as keys.
export async function getJobCountsByProvince() {
  const { data } = await sanityFetch({ query: JOB_PROVINCES_QUERY, stega: false });
  const counts: Record<string, number> = {};
  for (const province of data) {
    if (province) counts[province] = (counts[province] ?? 0) + 1;
  }
  return counts;
}

export async function getJob(slug: string, { stega }: { stega?: boolean } = {}) {
  const { data } = await sanityFetch({ query: JOB_QUERY, params: { slug }, stega });
  return data;
}

export async function getCompanies() {
  const { data } = await sanityFetch({ query: COMPANIES_QUERY });
  return data;
}

export async function getCompany(slug: string, { stega }: { stega?: boolean } = {}) {
  const { data } = await sanityFetch({ query: COMPANY_QUERY, params: { slug }, stega });
  return data;
}

// For sitemap/static params: published content only, never stega-encoded.
export async function getSitemapEntries() {
  const [{ data: jobs }, { data: companies }] = await Promise.all([
    sanityFetch({ query: JOB_SLUGS_QUERY, perspective: "published", stega: false }),
    sanityFetch({ query: COMPANY_SLUGS_QUERY, perspective: "published", stega: false }),
  ]);
  return { jobs, companies };
}
