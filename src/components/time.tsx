import { TimeIcon } from "./icons/time";

import styles from "./time.module.css";

export default function Time({ jobtime }: { jobtime: string }) {
  return (
    <div className={styles.time}>
      <TimeIcon color="#fff" arialabel="Icono de reloj" />
      <p className={styles.timeText}>
        <strong>{jobtime}</strong>
      </p>
    </div>
  );
}
