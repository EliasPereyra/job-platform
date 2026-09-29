import { MapPoint } from "reicon-react";

import styles from "../badge.module.css";

export default function Location({ location }: { location: string }) {
  return (
    <span className={`${styles.badge} ${styles["badge--location"]}`}>
      <MapPoint className={styles["badge__icon"]} size={16} aria-hidden />
      {location}
    </span>
  );
}
