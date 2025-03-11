import Link from "next/link";
import Image from "next/image";

import JobAvailable from "./badges/job-available/job-available";
import Location from "./badges/location/location";
import Modality from "./badges/modality/modality";
import Money from "./badges/money/money";
import { Date } from "./badges/date/date";

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
  workingDay: string;
  salary: string;
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
  workingDay,
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
