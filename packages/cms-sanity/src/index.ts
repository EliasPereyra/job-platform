import type { getCompanies, getCompany, getJob, getJobsPage, getSiteSettings } from "./api";
import type { JOBS_PAGE_QUERY_RESULT } from "./sanity.types";

export * from "./api";

// Types as returned by the API functions (strings may carry Visual Editing
// markers in draft mode, see `stegaClean`).
export type JobCard = Awaited<ReturnType<typeof getJobsPage>>["jobs"][number];
export type Job = NonNullable<Awaited<ReturnType<typeof getJob>>>;
export type Company = NonNullable<Awaited<ReturnType<typeof getCompany>>>;
export type CompanySummary = Awaited<ReturnType<typeof getCompanies>>[number];
export type SiteSettings = Awaited<ReturnType<typeof getSiteSettings>>;

export type JobModality = JOBS_PAGE_QUERY_RESULT[number]["modality"];
export type JobWorkingDay = JOBS_PAGE_QUERY_RESULT[number]["workingDay"];
