import { Briefcase, Buildings, MapPoint } from "reicon-react";

import type { JobCardData } from "@/modules/cms";
import JobCard from "@/modules/jobs/components/job-card";
import { ButtonLink } from "@/shared/components/button-link/button-link";
import { HeroIllustration } from "./hero-illustration";

import styles from "./hero.module.css";

type HeroProps = {
  latestJobs: JobCardData[];
  totalJobs: number;
  provinceCount: number;
  companyCount: number;
};

export function Hero({ latestJobs, totalJobs, provinceCount, companyCount }: HeroProps) {
  const statistics = [
    { icon: Briefcase, value: totalJobs, one: "oferta", many: "ofertas" },
    { icon: MapPoint, value: provinceCount, one: "provincia", many: "provincias" },
    { icon: Buildings, value: companyCount, one: "empresa", many: "empresas" },
  ];

  return (
    <section className={styles.hero}>
      <HeroIllustration className={styles["hero__illustration"]} />
      <div className={styles["hero__copy"]}>
        <h1 className={styles["hero__title"]}>Ofertas de trabajo sin experiencia</h1>
        <p className={styles["hero__lead"]}>
          Encontrá tu primer empleo en Argentina y escribile directo a la empresa. Sin
          registros, sin intermediarios.
        </p>
        <ButtonLink href="/todos-los-trabajos" transitionType="nav-forward">
          Ver las {totalJobs} ofertas
        </ButtonLink>
        <ul className={styles["hero__stats"]} aria-label="WorkStart en números">
          {statistics.map(({ icon: Icon, value, one, many }) => (
            <li key={many} className={styles["hero__stat"]}>
              <span className={styles["hero__stat-icon"]}>
                <Icon size={20} aria-hidden />
              </span>
              <strong className={styles["hero__stat-value"]}>{value}</strong>
              <span className={styles["hero__stat-label"]}>{value === 1 ? one : many}</span>
            </li>
          ))}
        </ul>
      </div>

      {latestJobs.length > 0 && (
        <ul className={styles["hero__board"]} aria-label="Últimas ofertas publicadas">
          {latestJobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </ul>
      )}
    </section>
  );
}
