import { Calendar } from "@/shared/components/icons/calendar";
import { formatDate } from "@/shared/utils/format-date";

import styles from "./date.module.css";

export function Date({
  color = "#aaa",
  modified,
}: {
  color?: string;
  modified: string;
}) {
  return (
    <div className={styles.dateContainer}>
      <Calendar color={color} />
      <small style={{ color }} className={styles.date}>
        Publicado el {formatDate(modified || "")}
      </small>
    </div>
  );
}
