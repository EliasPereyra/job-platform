import Link from "next/link";

import { CmsImage } from "@/modules/cms/cms-image";
import type { JobCardData } from "@/modules/cms";
import { formatLocation, modalityLabel } from "../labels";
import JobAvailable from "./badges/job-available/job-available";
import Location from "./badges/location/location";
import Modality from "./badges/modality/modality";
import Money from "./badges/money/money";
import { Date } from "./badges/date/date";

import styles from "./job-card.module.css";

export default function JobCard({ job }: { job: JobCardData }) {
  return (
    <li aria-label="Tarjeta de trabajo" className={styles.jobCardContainer}>
      <Link href={`/job/${job.slug}`} className={styles.jobCard}>
        <div className={styles.cardBg}></div>
        <div className={styles.content}>
          <div className={styles.company}>
            <div className={styles.companyInfo}>
              <CmsImage
                value={job.company.logo}
                width={48}
                height={48}
                className={styles.logo}
              />
              <div className={styles.companyContent}>
                <h3 className={styles.jobTitle}>{job.title}</h3>
                <small className={styles.companyName}>{job.company.name}</small>
              </div>
            </div>
            <JobAvailable available={job.available ?? false} />
          </div>

          <Date color="#333" modified={job.publishedAt} />
          {job.categories?.length ? (
            <ul className={styles.jobCategories}>
              {job.categories.map((category) => (
                <li key={category._id}>
                  <small>#{category.name}</small>
                </li>
              ))}
            </ul>
          ) : null}
          <div className={styles.info}>
            <Location color="#333" location={formatLocation(job)} />
            <Modality color="#333" modality={modalityLabel(job.modality)} />
            {job.salary && <Money color="#333" salary={job.salary} />}
          </div>
        </div>
      </Link>
    </li>
  );
}
