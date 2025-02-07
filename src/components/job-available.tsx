import styles from "./JobCard.module.css";

export default function JobAvailable({ available }: { available: boolean }) {
  return (
    <div>
      <div aria-label="Circulo" />
      <div className={available ? styles.available : styles.notAvailable}>
        <div className={available ? styles.pinkCircle : styles.grayCircle} />
        <p className={available ? styles.pinkText : styles.grayText}>
          {available ? "Disponible" : "Finalizada"}
        </p>
      </div>
    </div>
  );
}
