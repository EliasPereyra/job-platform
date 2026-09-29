import { cleanCmsValue } from "@/modules/cms/clean";

// Shared-element names pairing the job card with the job and company pages.
// Slugs are cleaned because draft mode adds invisible stega characters.
export const jobTitleName = (slug: string) => `job-title-${cleanCmsValue(slug)}`;
export const jobLogoName = (slug: string) => `job-logo-${cleanCmsValue(slug)}`;
export const companyLogoName = (slug: string) => `company-logo-${cleanCmsValue(slug)}`;
