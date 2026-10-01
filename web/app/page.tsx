import { Metadata } from "next";

import { getCompanies, getJobCountsByProvince, getJobsPage } from "@/modules/cms";
import { BenefitsSection } from "@/modules/landing/components/benefits-section/benefits-section";
import { CompaniesSection } from "@/modules/landing/components/companies-section/companies-section";
import { CtaSection } from "@/modules/landing/components/cta-section/cta-section";
import { Hero } from "@/modules/landing/components/hero/hero";
import { ProvincesSection } from "@/modules/landing/components/provinces-section/provinces-section";
import { StepsSection } from "@/modules/landing/components/steps-section/steps-section";
import { PageTransition } from "@/shared/components/page-transition/page-transition";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Ofertas de trabajo sin experiencia",
  description:
    "Trabajos exclusivos que no requieren experiencia laboral previa. Mira la lista de trabajos publicados y postula en aquellos en que destacas.",
};

export default async function Home() {
  const [companies, { jobs: latestJobs, total }, provinceCounts] = await Promise.all([
    getCompanies(),
    getJobsPage({ page: 1, pageSize: 2 }),
    getJobCountsByProvince(),
  ]);

  return (
    <PageTransition>
      <div className={styles.home}>
        <Hero
          latestJobs={latestJobs}
          totalJobs={total}
          provinceCount={Object.keys(provinceCounts).length}
          companyCount={companies.length}
        />
        <ProvincesSection counts={provinceCounts} />
        <CompaniesSection companies={companies} />
        <BenefitsSection />
        <StepsSection />
        <CtaSection />
      </div>
    </PageTransition>
  );
}
