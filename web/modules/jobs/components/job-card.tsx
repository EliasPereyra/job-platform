import { ViewTransition } from "react";
import { ArrowRight } from "reicon-react";

import { CmsImage } from "@/modules/cms/cms-image";
import type { JobCardData } from "@/modules/cms";
import { TransitionLink } from "@/shared/components/transition-link/transition-link";
import { formatLocation } from "../utils/labels";
import { jobLogoName, jobTitleName } from "../utils/transition-names";
import JobAvailable from "./badges/job-available/job-available";
import Location from "./badges/location/location";
import Modality from "./badges/modality/modality";
import Money from "./badges/money/money";
import { Date } from "./badges/date/date";

import styles from "./job-card.module.css";

// Tear-off tabs along the bottom edge, like the paper flyers on a street pole.
const FRINGE_TABS = 5;

export default function JobCard({ job }: { job: JobCardData }) {
  return (
    <li aria-label="Tarjeta de trabajo" className={styles["job-card"]}>
      <TransitionLink href={`/job/${job.slug}`} transitionType="nav-forward" className={styles["job-card__link"]}>
        <div className={styles["job-card__body"]}>
          <header className={styles["job-card__header"]}>
            <ViewTransition name={jobLogoName(job.slug)} share="morph" default="none">
              <CmsImage value={job.company.logo} width={40} height={40} className={styles["job-card__logo"]} />
            </ViewTransition>
            <span className={styles["job-card__company"]}>{job.company.name}</span>
            <JobAvailable available={job.available ?? false} />
          </header>

          <ViewTransition name={jobTitleName(job.slug)} share="text-morph" default="none">
            <h3 className={styles["job-card__title"]}>{job.title}</h3>
          </ViewTransition>
          <Date modified={job.publishedAt} />

          <div className={styles["job-card__badges"]}>
            <Location location={formatLocation(job)} />
            <Modality modality={job.modality} />
            {job.salary && <Money salary={job.salary} />}
          </div>

          {job.categories?.length ? (
            <ul className={styles["job-card__categories"]} aria-label="Categorías">
              {job.categories.map((category) => (
                <li key={category._id} className={styles["job-card__category"]}>
                  {category.name}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className={styles["job-card__fringe"]}>
          {Array.from({ length: FRINGE_TABS }, (_, index) => (
            <span key={index} className={styles["job-card__tab"]} aria-hidden />
          ))}
          <span className={`${styles["job-card__tab"]} ${styles["job-card__tab--action"]}`}>
            Ver oferta
            <ArrowRight size={16} aria-hidden />
          </span>
        </div>
      </TransitionLink>
    </li>
  );
}
