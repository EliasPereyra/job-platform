import Link from "next/link";

import { LeftArrowRounded } from "@/shared/components/icons/left-arrow-rounded";
import { RightArrowRounded } from "@/shared/components/icons/right-arrow-rounded";

import styles from "./pagination.module.css";

const href = (page: number) => (page <= 1 ? "/todos-los-trabajos/" : `/todos-los-trabajos/?page=${page}`);

export function Pagination({ page, totalPages }: { page: number; totalPages: number }) {
  if (totalPages <= 1) return null;

  const hasPrevious = page > 1;
  const hasNext = page < totalPages;

  return (
    <nav className={styles.pagination} aria-label="Paginación">
      {hasPrevious ? (
        <Link href={href(page - 1)} className={styles.button} aria-label="Página anterior">
          <LeftArrowRounded currentColor="#88a097" arialabel="Icono de flecha a la izquierda" />
        </Link>
      ) : (
        <span className={styles.button} aria-disabled="true">
          <LeftArrowRounded currentColor="#c7c7c7" arialabel="Icono de flecha a la izquierda" />
        </span>
      )}
      <span className={styles.status}>
        Página {page} de {totalPages}
      </span>
      {hasNext ? (
        <Link href={href(page + 1)} className={styles.button} aria-label="Página siguiente">
          <RightArrowRounded currentColor="#88a097" arialabel="Icono de flecha a la derecha" />
        </Link>
      ) : (
        <span className={styles.button} aria-disabled="true">
          <RightArrowRounded currentColor="#c7c7c7" arialabel="Icono de flecha a la derecha" />
        </span>
      )}
    </nav>
  );
}
