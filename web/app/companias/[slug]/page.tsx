import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getCompany } from "@/modules/cms";
import { CmsImage } from "@/modules/cms/cms-image";
import { RichText } from "@/modules/cms/rich-text";
import JobCard from "@/modules/jobs/components/job-card";
import { buildMetadata } from "@/shared/utils/metadata";

import styles from "./page.module.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const company = await getCompany(slug, { stega: false });
  if (!company) return {};

  return buildMetadata({
    seo: company.seo,
    fallbackTitle: `Trabajos en ${company.name}`,
    fallbackImage: company.logo,
    path: `/companias/${slug}/`,
  });
}

export default async function CompanyPage({ params }: PageProps) {
  const { slug } = await params;
  const company = await getCompany(slug);

  if (!company) notFound();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <CmsImage className={styles.logo} value={company.logo} alt={company.name} width={120} height={120} />
        <div>
          <h1 className={styles.name}>{company.name}</h1>
          <a className={styles.link} href={`mailto:${company.contactEmail}`}>
            {company.contactEmail}
          </a>
        </div>
      </header>
      <div className={styles.description}>
        <RichText value={company.description} />
      </div>

      <h2 className={styles.jobsTitle}>Ofertas publicadas</h2>
      {company.jobs.length ? (
        <ul className={styles.jobs}>
          {company.jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </ul>
      ) : (
        <p>Esta empresa no tiene ofertas publicadas por ahora.</p>
      )}
    </div>
  );
}
