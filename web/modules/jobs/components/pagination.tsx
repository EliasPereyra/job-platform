import { ChevronLeft, ChevronRight } from "reicon-react";

import { jobsHref } from "@/modules/jobs/jobs-href";
import { TransitionLink } from "@/shared/components/transition-link/transition-link";

import styles from "./pagination.module.css";

export function Pagination({
  page,
  totalPages,
  province,
}: {
  page: number;
  totalPages: number;
  province?: string | null;
}) {
  if (totalPages <= 1) return null;

  const href = (target: number) => jobsHref({ page: target, province });

  const hasPrevious = page > 1;
  const hasNext = page < totalPages;

  return (
    <nav className={styles.pagination} aria-label="Paginación">
      {hasPrevious ? (
        <TransitionLink
          href={href(page - 1)}
          transitionType="nav-back"
          className={`${styles["pagination__button"]} ${styles["pagination__button--prev"]}`}
          aria-label="Página anterior"
        >
          <ChevronLeft size={20} aria-hidden />
        </TransitionLink>
      ) : (
        <span
          className={`${styles["pagination__button"]} ${styles["pagination__button--disabled"]}`}
          aria-disabled="true"
        >
          <ChevronLeft size={20} aria-hidden />
        </span>
      )}
      <span className={styles["pagination__status"]}>
        Página <strong>{page}</strong> de {totalPages}
      </span>
      {hasNext ? (
        <TransitionLink
          href={href(page + 1)}
          transitionType="nav-forward"
          className={`${styles["pagination__button"]} ${styles["pagination__button--next"]}`}
          aria-label="Página siguiente"
        >
          <ChevronRight size={20} aria-hidden />
        </TransitionLink>
      ) : (
        <span
          className={`${styles["pagination__button"]} ${styles["pagination__button--disabled"]}`}
          aria-disabled="true"
        >
          <ChevronRight size={20} aria-hidden />
        </span>
      )}
    </nav>
  );
}
