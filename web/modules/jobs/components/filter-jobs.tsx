"use client";

import React, { useReducer, useState } from "react";

import type { JobCardData } from "@/modules/cms";
import { Search } from "@/shared/components/icons/search";
import LocationIcon from "@/shared/components/icons/location-icon";
import { WorkCase } from "@/shared/components/icons/workcase";
import { provincias } from "@/shared/utils/provinces";
import JobCard from "./job-card";

import styles from "./filter-jobs.module.css";

type FormState = { searchByTitle: string; location: string };

const formReducer = (
  state: FormState,
  event: { name: keyof FormState; value: string },
): FormState => ({
  ...state,
  [event.name]: event.value,
});

const matches = (job: JobCardData, { searchByTitle, location }: FormState) => {
  const title = searchByTitle.trim().toLowerCase();
  const byTitle = !title || job.title.toLowerCase().includes(title);
  const byLocation = !location || job.province === location;
  return byTitle && byLocation;
};

export default function FilterJobs({ jobs, total }: { jobs: JobCardData[]; total: number }) {
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [formData, setFormData] = useReducer(formReducer, {
    searchByTitle: "",
    location: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFilteredJobs(jobs.filter((job) => matches(job, formData)));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      name: e.target.name as keyof FormState,
      value: e.target.value,
    });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.subtitle}>
        Cerca de <strong className={styles.jobsNumberHighlight}>{total}</strong>{" "}
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
              placeholder="Por ej. Repositor"
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
              <option className={styles.option} value="">
                Todas las provincias
              </option>
              {provincias.map((provincia) => (
                <option className={styles.option} key={provincia.id} value={provincia.name}>
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
      {filteredJobs.length > 0 ? (
        <ul className={styles.page}>
          {filteredJobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </ul>
      ) : (
        <p className={styles.noJobs}>
          No hay trabajos relacionados con tu búsqueda. Intenta nuevamente con otros términos.
        </p>
      )}
    </div>
  );
}
