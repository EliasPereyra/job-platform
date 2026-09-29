import { Clock } from "reicon-react";

import styles from "../badge.module.css";

export default function Time({ workingDay }: { workingDay: string }) {
  return (
    <span className={`${styles.badge} ${styles["badge--schedule"]}`}>
      <Clock className={styles["badge__icon"]} size={16} aria-hidden />
      {workingDay}
    </span>
  );
}
