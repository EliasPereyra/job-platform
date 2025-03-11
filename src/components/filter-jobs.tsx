"use client";

import React, { useReducer, useState } from "react";
import { Job } from "@/gql/graphql";

import JobCard from "./job-card";
import { Search } from "./icons/search";
import LocationIcon from "./icons/location-icon";
import { WorkCase } from "./icons/workcase";
import { provincias } from "@/utils/provinces";

import styles from "./filter-jobs.module.css";

type AllJobsStateProps = Array<Job>;

const formReducer = (state: any, event: any) => {
  return {
    ...state,
    [event?.name]: event?.value,
  };
};
export default function FilterJobs({ jobs: queryAllJobs }: any) {
  const [allJobs, setAllJobs] = useState<AllJobsStateProps>(
    queryAllJobs.jobs?.nodes
  );
  const [formData, setFormData] = useReducer(formReducer, {
    searchByTitle: "",
    location: "",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    setAllJobs(
      queryAllJobs.jobs?.nodes.filter((job: any) => {
        if (formData.location !== "" && formData.searchByTitle !== "") {
          return (
            job.title
              .toLowerCase()
              .includes(formData.searchByTitle?.toLowerCase()) &&
            job.jobs?.location
              ?.toLowerCase()
              .includes(formData.location?.toLowerCase())
          );
        }

        if (formData.searchByTitle !== "" && formData.location === "") {
          return job.title
            .toLowerCase()
            .includes(formData.searchByTitle?.toLowerCase());
        }

        return job;
      })
    );
  };

  const handleChange = (e: any) => {
    setFormData({
      name: e.target?.name,
      value: e.target?.value,
    });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.subtitle}>
        Cerca de{" "}
        <strong className={styles.jobsNumberHighlight}>
          {queryAllJobs.jobs?.nodes.length}
        </strong>{" "}
        empleos disponibles para que los veas
      </h2>
      <form onSubmit={handleSubmit} className={styles.searchContainer}>
        <div className={styles.searchInput}>
          <div className={styles.search}>
            <WorkCase color="#88a097" />
            <input
              id="search"
              className={styles.input}
              type="text"
              name="searchByTitle"
              aria-label="Buscar trabajos"
              placeholder="Por ej. Desarrollador web"
              value={formData.searchByTitle}
              onChange={handleChange}
            />
          </div>
          <p>|</p>
          <div className={styles.location}>
            <LocationIcon color="#88a097" />
            <select
              onChange={handleChange}
              value={formData.location}
              className={styles.select}
              name="location"
              aria-label="Provincia"
              id="location"
            >
              {provincias.map((provincia: any) => (
                <option
                  className={styles.option}
                  key={provincia.id}
                  defaultValue="Todos"
                  value={provincia.name}
                >
                  {provincia.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button type="submit" className={styles.button} aria-label="Buscar">
          <Search color="#fff" />
          Buscar
        </button>
      </form>

      <h3 className={styles.title}>Últimos trabajos publicados</h3>
      <ul className={styles.page}>
        {allJobs?.length > 0 ? (
          allJobs.map((job: any) => (
            <JobCard
              key={job.slug}
              slug={job.slug}
              companyLogo={job.jobs.company.node?.companies.logo?.node}
              title={job.title}
              companyName={job.jobs.company.node?.companies.logo?.node.title}
              publishDate={job.modified}
              location={job.jobs.location}
              modality={job.jobs.modality}
              workingDay={job.jobs.workingDay}
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
