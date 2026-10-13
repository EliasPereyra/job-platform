"use client";

import { useRouter } from "next/navigation";
import React, {
  Activity,
  useReducer,
  useState,
  useTransition,
  ViewTransition,
} from "react";
import {
  Briefcase,
  Category,
  ChevronDown,
  MapPoint,
  Search,
} from "reicon-react";

import type { JobCardData, JobCategory } from "@/modules/cms";
import { SavedJobsLink } from "@/modules/favorites/components/saved-jobs-link";
import { jobsHref } from "@/modules/jobs/utils/jobs-href";
import { Loader } from "@/shared/components/loader/loader";
import { provincias } from "@/shared/utils/provinces";
import JobCard from "./job-card";

import styles from "./filter-jobs.module.css";

type FormState = { searchByTitle: string; location: string; category: string };

const EMPTY_FORM: FormState = { searchByTitle: "", location: "", category: "" };

const formReducer = (
  state: FormState,
  event: { name: keyof FormState; value: string } | "reset",
): FormState =>
  event === "reset" ? EMPTY_FORM : { ...state, [event.name]: event.value };

const matches = (
  job: JobCardData,
  { searchByTitle, location, category }: FormState,
) => {
  const title = searchByTitle.trim().toLowerCase();
  const byTitle = !title || job.title.toLowerCase().includes(title);
  const byLocation = !location || job.province === location;
  const byCategory =
    !category || (job.categories ?? []).some(({ slug }) => slug === category);
  return byTitle && byLocation && byCategory;
};

// The province and the category (a slug) come from the URL and are filtered by
// the CMS query, so they cover every page; the title only filters the jobs on
// the current page.
export default function FilterJobs({
  jobs,
  total,
  page,
  province = null,
  categories = [],
  category = null,
}: {
  jobs: JobCardData[];
  total: number;
  page?: number;
  province?: string | null;
  categories?: JobCategory[];
  category?: string | null;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const initialForm = {
    ...EMPTY_FORM,
    location: province ?? "",
    category: category ?? "",
  };
  const [applied, setApplied] = useState<FormState>(initialForm);
  const [formData, setFormData] = useReducer(formReducer, initialForm);
  const filteredJobs = jobs.filter((job) => matches(job, applied));

  // Inside a transition so the cards animate out/in via their <ViewTransition>.
  const applyFilter = (next: FormState) =>
    startTransition(() => {
      setApplied(next);
      if (
        next.location !== (province ?? "") ||
        next.category !== (category ?? "")
      ) {
        router.push(
          jobsHref({
            province: next.location || null,
            category: next.category || null,
          }),
          { scroll: false },
        );
      }
    });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    applyFilter(formData);
  };

  const handleReset = () => {
    setFormData("reset");
    applyFilter(EMPTY_FORM);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      name: e.target.name as keyof FormState,
      value: e.target.value,
    });
  };

  const categoryName = categories.find(({ slug }) => slug === category)?.name;
  const scope = [
    categoryName && `de ${categoryName}`,
    province && `en ${province}`,
  ]
    .filter(Boolean)
    .join(" ");
  const retryHint = [
    province && "otra provincia",
    categoryName && "otra categoría",
  ]
    .filter(Boolean)
    .join(" u ");

  return (
    <div className={styles["job-search"]}>
      <header className={styles["job-search__intro"]}>
        <h1 className={styles["job-search__title"]}>Todas las ofertas</h1>
        <p className={styles["job-search__lead"]}>
          <strong className={styles["job-search__count"]}>{total}</strong>{" "}
          {scope
            ? `${total === 1 ? "oferta publicada" : "ofertas publicadas"} ${scope}.`
            : "ofertas publicadas por empresas de toda Argentina."}{" "}
          Buscá por puesto, provincia o categoría.
        </p>
        <SavedJobsLink />
      </header>

      <form
        onSubmit={handleSubmit}
        className={styles["job-search__form"]}
        role="search"
      >
        <label
          className={`${styles["job-search__field"]} ${styles["job-search__field--grow"]}`}
        >
          <Briefcase
            className={styles["job-search__field-icon"]}
            size={20}
            aria-hidden
          />
          <input
            id="search"
            className={styles["job-search__input"]}
            type="text"
            name="searchByTitle"
            aria-label="Buscar trabajos"
            placeholder="Puesto, por ej. repositor"
            value={formData.searchByTitle}
            onChange={handleChange}
          />
        </label>
        <label className={styles["job-search__field"]}>
          <MapPoint
            className={styles["job-search__field-icon"]}
            size={20}
            aria-hidden
          />
          <select
            onChange={handleChange}
            value={formData.location}
            className={styles["job-search__select"]}
            name="location"
            aria-label="Provincia"
            id="location"
          >
            <option value="">Todas las provincias</option>
            {provincias.map((provincia) => (
              <option key={provincia.id} value={provincia.name}>
                {provincia.name}
              </option>
            ))}
          </select>
          <ChevronDown
            className={styles["job-search__chevron"]}
            size={16}
            aria-hidden
          />
        </label>
        <label className={styles["job-search__field"]}>
          <Category
            className={styles["job-search__field-icon"]}
            size={20}
            aria-hidden
          />
          <select
            onChange={handleChange}
            value={formData.category}
            className={styles["job-search__select"]}
            name="category"
            aria-label="Categoría"
            id="category"
          >
            <option value="">Todas las categorías</option>
            {categories.map(({ _id, name, slug }) => (
              <option key={_id} value={slug}>
                {name}
              </option>
            ))}
          </select>
          <ChevronDown
            className={styles["job-search__chevron"]}
            size={16}
            aria-hidden
          />
        </label>
        <button
          type="submit"
          className={styles["job-search__submit"]}
          aria-label="Buscar"
          disabled={isPending}
        >
          <Activity mode={isPending ? "visible" : "hidden"}>
            <Loader size={20} tone="on-action" label="Buscando" />
          </Activity>
          <Activity mode={isPending ? "hidden" : "visible"}>
            <Search size={20} aria-hidden />
          </Activity>
          Buscar
        </button>
      </form>

      <h2 className={styles["job-search__results-title"]}>
        {page && page > 1 ? `Página ${page}` : "Últimas ofertas publicadas"}
      </h2>
      {filteredJobs.length > 0 ? (
        // FilterJobs remounts per page, so this named boundary pairs old and new
        // results and slides them in the paging direction.
        <ViewTransition
          name="jobs-results"
          share={{
            "nav-forward": "nav-forward",
            "nav-back": "nav-back",
            default: "auto",
          }}
          default="none"
        >
          <ul className={styles["job-search__results"]}>
            {filteredJobs.map((job) => (
              <ViewTransition key={job._id} enter="card-in" exit="card-out">
                <JobCard job={job} />
              </ViewTransition>
            ))}
          </ul>
        </ViewTransition>
      ) : (
        <ViewTransition enter="card-in" exit="card-out">
          <div className={styles["job-search__empty"]}>
            <p>
              {scope && jobs.length === 0
                ? `Todavía no hay ofertas publicadas ${scope}. Probá con ${retryHint}.`
                : "No hay trabajos relacionados con tu búsqueda en esta página. Probá con otro puesto, provincia o categoría."}
            </p>
            <button
              type="button"
              className={styles["job-search__reset"]}
              onClick={handleReset}
            >
              Ver todas las ofertas
            </button>
          </div>
        </ViewTransition>
      )}
    </div>
  );
}
