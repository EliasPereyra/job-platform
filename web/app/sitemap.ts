import type { MetadataRoute } from "next";

import { getSitemapEntries } from "@/modules/cms";
import { siteUrl } from "@/shared/utils/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { jobs, companies } = await getSitemapEntries();

  const staticRoutes = ["/", "/todos-los-trabajos/", "/sobre-nosotros/", "/contacto/"].map(
    (path) => ({ url: `${siteUrl}${path}` }),
  );

  return [
    ...staticRoutes,
    ...jobs.map((job) => ({ url: `${siteUrl}/job/${job.slug}/`, lastModified: job._updatedAt })),
    ...companies.map((company) => ({
      url: `${siteUrl}/companias/${company.slug}/`,
      lastModified: company._updatedAt,
    })),
  ];
}
