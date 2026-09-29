import styles from "./job-available.module.css";

export default function JobAvailable({ available }: { available: boolean }) {
  return (
    <span className={`${styles.status} ${styles[available ? "status--open" : "status--closed"]}`}>
      <span className={styles["status__dot"]} aria-hidden />
      {available ? "Disponible" : "Finalizada"}
    </span>
  );
}
