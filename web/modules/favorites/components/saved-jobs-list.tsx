"use client";

import { useRouter } from "next/navigation";
import { useEffect, ViewTransition } from "react";

import type { JobCardData } from "@/modules/cms";
import JobCard from "@/modules/jobs/components/job-card";
import { ButtonLink } from "@/shared/components/button-link/button-link";
import { Loader } from "@/shared/components/loader/loader";
import { useFavorites } from "../context/favorites-context";
import styles from "./saved-jobs-list.module.css";

export function SavedJobsList({
  jobs,
  hasOtherPages,
}: {
  jobs: JobCardData[];
  hasOtherPages: boolean;
}) {
  const router = useRouter();
  const { ready, isSaved, isPending } = useFavorites();
  const visibleJobs = ready ? jobs.filter((job) => isSaved(job._id)) : jobs;
  // Every job of this page was unsaved but others remain on other pages: once
  // the removals are stored, ask the server for the updated pages.
  const pageEmptied =
    hasOtherPages && jobs.length > 0 && visibleJobs.length === 0;
  const saving = jobs.some((job) => isPending(job._id));

  useEffect(() => {
    if (pageEmptied && !saving) router.refresh();
  }, [pageEmptied, saving, router]);

  if (pageEmptied) {
    return (
      <div className={styles["saved-jobs-list__loading"]}>
        <Loader label="Actualizando empleos guardados" />
      </div>
    );
  }

  if (!visibleJobs.length) {
    return (
      <ViewTransition enter="card-in" exit="card-out">
        <div className={styles["saved-jobs-list__empty"]}>
          <p>
            Todavía no guardaste ninguna oferta. Tocá el corazón de una oferta
            para encontrarla acá después.
          </p>
          <ButtonLink href="/todos-los-trabajos" transitionType="nav-forward">
            Ver ofertas
          </ButtonLink>
        </div>
      </ViewTransition>
    );
  }

  return (
    <ul className={styles["saved-jobs-list"]}>
      {visibleJobs.map((job) => (
        <ViewTransition key={job._id} enter="card-in" exit="card-out">
          <JobCard job={job} />
        </ViewTransition>
      ))}
    </ul>
  );
}
