import { ViewTransition } from "react";

import type { CompanySummary } from "@/modules/cms";
import { CmsImage } from "@/modules/cms/cms-image";
import { companyLogoName } from "@/modules/jobs/utils/transition-names";
import { SectionTitle } from "@/shared/components/section-title/section-title";
import { TransitionLink } from "@/shared/components/transition-link/transition-link";

import styles from "./companies-section.module.css";

export function CompaniesSection({ companies }: { companies: CompanySummary[] }) {
  if (companies.length === 0) return null;

  return (
    <section className={styles.companies} aria-labelledby="companies-title">
      <div className={styles["companies__intro"]}>
        <SectionTitle id="companies-title" className={styles["companies__title"]}>
          Empresas que publican en WorkStart
        </SectionTitle>
        <p className={styles["companies__lead"]}>
          Elegí una empresa para conocerla y ver sus ofertas.
        </p>
      </div>
      <ul className={styles["companies__list"]}>
        {companies.map((company) => (
          <li key={company._id}>
            <TransitionLink
              className={styles["companies__link"]}
              href={`/companias/${company.slug}`}
              transitionType="nav-forward"
              title={company.name}
            >
              <ViewTransition name={companyLogoName(company.slug)} share="morph" default="none">
                <CmsImage
                  className={styles["companies__logo"]}
                  value={company.logo}
                  alt={company.name}
                  width={72}
                  height={72}
                />
              </ViewTransition>
            </TransitionLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
