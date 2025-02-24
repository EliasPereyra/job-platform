"use client";

import { useState } from "react";

import JobCard from "./job-card";
import styles from "./filter-jobs.module.css";

export default function FilterJobs({ jobs: queryAllJobs }: any) {
  const [allJobs, setAllJobs] = useState(queryAllJobs.jobs?.nodes);

  const filterJobs = (e: any) => {
    setAllJobs(
      queryAllJobs.jobs?.nodes.filter((job: any) =>
        job.title.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <input
          id="search"
          className={styles.input}
          type="text"
          aria-label="Buscar trabajos"
          placeholder="Por ej. Desarrollador web"
          onChange={filterJobs}
        />
        <button className={styles.button}>Buscar</button>
      </div>

      <h2 className={styles.title}>Últimos trabajos publicados</h2>
      <ul className={styles.page}>
        {allJobs?.length > 0 ? (
          allJobs.map((job: any) => (
            <JobCard
              key={job.slug}
              slug={job.slug}
              companyLogo={job.jobs.company.node?.companies.logo?.node}
              title={job.title}
              publishDate={job.modified}
              location={job.jobs.location}
              modality={job.jobs.modality}
              jobTime={job.jobs.jobtime}
              salary={job.jobs.salary}
              available={job.jobs.available}
              jobCategories={job.jobs.jobCategories.nodes}
            />
          ))
        ) : (
          <p className={styles.noJobs}>
            No hay trabajos relacionados con tu búsqueda. Intenta nuevamente con
            otros términos.
          </p>
        )}
      </ul>
    </div>
  );
}
