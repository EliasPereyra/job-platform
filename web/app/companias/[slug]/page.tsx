import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { Envelope } from "reicon-react";

import { getCompany } from "@/modules/cms";
import { CmsImage } from "@/modules/cms/cms-image";
import { RichText } from "@/modules/cms/rich-text";
import JobCard from "@/modules/jobs/components/job-card";
import { companyLogoName } from "@/modules/jobs/utils/transition-names";
import { PageTransition } from "@/shared/components/page-transition/page-transition";
import { buildMetadata } from "@/shared/utils/metadata";
import backdrop from "@/shared/styles/backdrop.module.css";

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
    <PageTransition>
      <div className={`${backdrop.backdrop} ${styles["company-page"]}`}>
        <header className={styles["company-page__header"]}>
          <ViewTransition name={companyLogoName(slug)} share="morph" default="none">
            <CmsImage
              className={styles["company-page__logo"]}
              value={company.logo}
              alt={company.name}
              width={112}
              height={112}
            />
          </ViewTransition>
          <div className={styles["company-page__identity"]}>
            <h1 className={styles["company-page__name"]}>{company.name}</h1>
            <a className={styles["company-page__email"]} href={`mailto:${company.contactEmail}`}>
              <Envelope size={18} aria-hidden />
              {company.contactEmail}
            </a>
          </div>
        </header>

        <div className={styles["company-page__description"]}>
          <RichText value={company.description} />
        </div>

        <section className={styles["company-page__jobs"]} aria-labelledby="company-jobs-title">
          <h2 id="company-jobs-title" className={styles["company-page__jobs-title"]}>
            Ofertas publicadas
          </h2>
          {company.jobs.length ? (
            <ul className={styles["company-page__grid"]}>
              {company.jobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </ul>
          ) : (
            <p className={styles["company-page__empty"]}>
              {company.name} no tiene ofertas publicadas por ahora.
            </p>
          )}
        </section>
      </div>
    </PageTransition>
  );
}
