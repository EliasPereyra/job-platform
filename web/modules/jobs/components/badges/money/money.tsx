import { Wallet } from "reicon-react";

import styles from "../badge.module.css";

export default function Money({ salary }: { salary: string }) {
  return (
    <span className={`${styles.badge} ${styles["badge--salary"]}`}>
      <Wallet className={styles["badge__icon"]} size={16} aria-hidden />
      {salary}
    </span>
  );
}
