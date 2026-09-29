import { Calendar } from "reicon-react";

import { formatDate } from "@/shared/utils/format-date";

import styles from "./date.module.css";

export function Date({ modified }: { modified: string }) {
  return (
    <span className={styles["published-date"]}>
      <Calendar className={styles["published-date__icon"]} size={16} aria-hidden />
      <time dateTime={modified}>Publicado el {formatDate(modified || "")}</time>
    </span>
  );
}
