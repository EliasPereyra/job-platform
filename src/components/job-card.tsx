import Link from "next/link";
import Image from "next/image";

import JobAvailable from "./job-available";
import Location from "./location";
import Modality from "./modality";
import Money from "./money";
import { Date } from "./date";

import styles from "./job-card.module.css";

interface JobCompanyLogoDetails {
  sourceUrl: string;
  altText: string;
  mediaDetails: {
    width: number;
    height: number;
  };
}

interface JobCardProps {
  slug: string;
  title: string;
  companyName: string;
  publishDate: string;
  companyLogo: JobCompanyLogoDetails;
  location: string;
  modality: string;
  jobTime: string;
  salary: number;
  available: boolean;
  jobCategories: string[];
}

export default function JobCard({
  slug,
  title,
  companyLogo,
  companyName,
  publishDate,
  location,
  modality,
  jobTime,
  salary,
  available,
  jobCategories,
}: JobCardProps) {
  return (
    <li
      aria-label="Tarjeta de trabajo"
      className={styles.jobCardContainer}
      key={slug}
    >
      <Link href={`/job/${slug}`} className={styles.jobCard}>
        <div className={styles.cardBg}></div>
        <div className={styles.content}>
          <div className={styles.company}>
            <div className={styles.companyInfo}>
              <Image
                src={companyLogo?.sourceUrl}
                alt={companyLogo?.altText}
                width={companyLogo?.mediaDetails.width}
                height={companyLogo?.mediaDetails.height}
                className={styles.logo}
              />
              <div className={styles.companyContent}>
                <h3 className={styles.jobTitle}>{title}</h3>
                <small className={styles.companyName}>{companyName}</small>
              </div>
            </div>
            <JobAvailable available={available} />
          </div>

          <Date color="#333" modified={publishDate} />
          <ul className={styles.jobCategories}>
            {jobCategories.map((category: any) => (
              <li key={category.jobCategories.name}>
                <small>#{category.jobCategories.name}</small>
              </li>
            ))}
          </ul>
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
