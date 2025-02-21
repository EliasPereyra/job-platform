import Link from "next/link";

import JobAvailable from "./job-available";
import Location from "./location";
import Modality from "./modality";
import Money from "./money";
import { formatDate } from "@/utils/formatDate";

import styles from "./job-card.module.css";

interface JobCardProps {
  slug: string;
  logo?: string | undefined;
  title: string;
  publishDate: string;
  company: string;
  location: string;
  modality: string;
  jobTime: string;
  salary: number;
  available: boolean;
  jobCategory: string;
}

export default function JobCard({
  slug,
  logo,
  title,
  company,
  publishDate,
  location,
  modality,
  jobTime,
  salary,
  available,
  jobCategory,
}: JobCardProps) {
  return (
    <li className={styles.jobCardContainer} key={slug}>
      <Link href={`/job/${slug}`} className={styles.jobCard}>
        <div className={styles.cardBg}>
          <div className={styles.logo} />
          <JobAvailable available={available} />
        </div>
        <div className={styles.content}>
          <h3>{title}</h3>

          <small className={styles.publishDate}>
            {formatDate(publishDate)}
          </small>
          <p className={styles.jobCategory}>{jobCategory}</p>
          <div className={styles.info}>
            <Location color="#333" location={location} />
            <Modality color="#333" modality={modality} />
            <Money color="#333" salary={salary} />
          </div>
        </div>
      </Link>
    </li>
  );
}
