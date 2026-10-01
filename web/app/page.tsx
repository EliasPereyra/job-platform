import { Metadata } from "next";
import Image from "next/image";
import { ViewTransition } from "react";
import { Briefcase, Buildings, MapPoint } from "reicon-react";

import {
  getCompanies,
  getJobCountsByProvince,
  getJobsPage,
} from "@/modules/cms";
import { CmsImage } from "@/modules/cms/cms-image";
import JobCard from "@/modules/jobs/components/job-card";
import { ProvinceMap } from "@/modules/jobs/components/province-map/province-map";
import { jobsHref } from "@/modules/jobs/utils/jobs-href";
import { companyLogoName } from "@/modules/jobs/utils/transition-names";
import { HeroIllustration } from "@/shared/components/illustrations/hero-illustration";
import { PageTransition } from "@/shared/components/page-transition/page-transition";
import { TransitionLink } from "@/shared/components/transition-link/transition-link";

import styles from "./page.module.css";
import { BENEFITS, STEPS } from "@/shared/constants/landing-sections";

export const metadata: Metadata = {
  title: "Ofertas de trabajo sin experiencia",
  description:
    "Trabajos exclusivos que no requieren experiencia laboral previa. Mira la lista de trabajos publicados y postula en aquellos en que destacas.",
};

export default async function Home() {
  const [companies, { jobs: latestJobs, total }, provinceCounts] =
    await Promise.all([
      getCompanies(),
      getJobsPage({ page: 1, pageSize: 2 }),
      getJobCountsByProvince(),
    ]);
  const provincesWithJobs = Object.entries(provinceCounts).sort(
    ([nameA, a], [nameB, b]) => b - a || nameA.localeCompare(nameB, "es"),
  );

  const STATISTICS = [
    { icon: Briefcase, value: total, one: "oferta", many: "ofertas" },
    {
      icon: MapPoint,
      value: provincesWithJobs.length,
      one: "provincia",
      many: "provincias",
    },
    {
      icon: Buildings,
      value: companies.length,
      one: "empresa",
      many: "empresas",
    },
  ];

  return (
    <PageTransition>
      <div className={styles.home}>
        <section className={styles.hero}>
          <HeroIllustration className={styles["hero__illustration"]} />
          <div className={styles["hero__copy"]}>
            <h1 className={styles["hero__title"]}>
              Ofertas de trabajo sin experiencia
            </h1>
            <p className={styles["hero__lead"]}>
              Encontrá tu primer empleo en Argentina y escribile directo a la
              empresa. Sin registros, sin intermediarios.
            </p>
            <TransitionLink
              className={`${styles.button} ${styles["button--primary"]}`}
              href="/todos-los-trabajos"
              transitionType="nav-forward"
            >
              Ver las {total} ofertas
            </TransitionLink>
            <ul
              className={styles["hero__stats"]}
              aria-label="WorkStart en números"
            >
              {STATISTICS.map(({ icon: Icon, value, one, many }) => (
                <li key={many} className={styles["hero__stat"]}>
                  <span className={styles["hero__stat-icon"]}>
                    <Icon size={20} aria-hidden />
                  </span>
                  <strong className={styles["hero__stat-value"]}>
                    {value}
                  </strong>
                  <span className={styles["hero__stat-label"]}>
                    {value === 1 ? one : many}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {latestJobs.length > 0 && (
            <ul
              className={styles["hero__board"]}
              aria-label="Últimas ofertas publicadas"
            >
              {latestJobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </ul>
          )}
        </section>

        {provincesWithJobs.length > 0 && (
          <section
            className={`${styles.band} ${styles.provinces}`}
            aria-labelledby="provinces-title"
          >
            <div className={styles["provinces__intro"]}>
              <h2
                id="provinces-title"
                className={`${styles["section-title"]} ${styles["provinces__title"]}`}
              >
                Ofertas en todo el país
              </h2>
              <p className={styles["provinces__lead"]}>
                Elegí una provincia en el mapa o en la lista para ver sus
                ofertas.
              </p>
              <ul className={styles["provinces__list"]}>
                {provincesWithJobs.map(([province, count]) => (
                  <li key={province}>
                    <TransitionLink
                      className={styles["provinces__link"]}
                      href={jobsHref({ province })}
                      transitionType="nav-forward"
                      aria-label={`${province}: ${count} ${count === 1 ? "oferta" : "ofertas"}`}
                    >
                      {province}
                      <span className={styles["provinces__count"]}>
                        {count}
                      </span>
                    </TransitionLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles["provinces__map"]}>
              <ProvinceMap counts={provinceCounts} />
              <div className={styles["provinces__legend"]} aria-hidden>
                <span>Menos ofertas</span>
                <span className={styles["provinces__legend-scale"]} />
                <span>Más ofertas</span>
              </div>
            </div>
          </section>
        )}

        {companies.length > 0 && (
          <section
            className={styles.companies}
            aria-labelledby="companies-title"
          >
            <div className={styles["companies__intro"]}>
              <h2
                id="companies-title"
                className={`${styles["section-title"]} ${styles["companies__title"]}`}
              >
                Empresas que publican en WorkStart
              </h2>
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
                    <ViewTransition
                      name={companyLogoName(company.slug)}
                      share="morph"
                      default="none"
                    >
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
        )}

        <section className={styles.benefits} aria-labelledby="benefits-title">
          <h2
            id="benefits-title"
            className={`${styles["section-title"]} ${styles["benefits__title"]}`}
          >
            Pensado para tu primer trabajo
          </h2>
          <ul className={styles["benefits__list"]}>
            {BENEFITS.map(({ icon: Icon, tone, title, text }) => (
              <li
                key={title}
                className={`${styles["benefits__item"]} ${styles[`benefits__item--${tone}`]}`}
              >
                <span className={styles["benefits__icon"]}>
                  <Icon size={24} aria-hidden />
                </span>
                <h3 className={styles["benefits__item-title"]}>{title}</h3>
                <p className={styles["benefits__text"]}>{text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section
          className={`${styles.band} ${styles.steps}`}
          aria-labelledby="steps-title"
        >
          <h2
            id="steps-title"
            className={`${styles["section-title"]} ${styles["steps__title"]}`}
          >
            Cómo funciona
          </h2>
          <ol className={styles["steps__list"]}>
            {STEPS.map((step, index) => (
              <li key={step.title} className={styles["steps__item"]}>
                <div className={styles["steps__frame"]}>
                  <Image
                    className={styles["steps__image"]}
                    src={step.image}
                    alt={step.alt}
                    width={1600}
                    height={852}
                  />
                </div>
                <div className={styles["steps__content"]}>
                  <span className={styles["steps__number"]} aria-hidden>
                    {index + 1}
                  </span>
                  <h3 className={styles["steps__item-title"]}>{step.title}</h3>
                  <p className={styles["steps__text"]}>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.cta}>
          <h2 className={styles["cta__title"]}>
            Empezá a buscar tu próximo trabajo hoy
          </h2>
          <TransitionLink
            className={`${styles.button} ${styles["button--secondary"]}`}
            href="/todos-los-trabajos"
            transitionType="nav-forward"
          >
            Ver ofertas de trabajo
          </TransitionLink>
        </section>
      </div>
    </PageTransition>
  );
}
