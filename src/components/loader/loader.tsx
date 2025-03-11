import styles from "./loader.module.css";

export function Loader() {
  return (
    <div className={styles.ldsGrid}>
      <div className={styles.gridChild} />
      <div className={styles.gridChild} />
      <div className={styles.gridChild} />
      <div className={styles.gridChild} />
      <div className={styles.gridChild} />
      <div className={styles.gridChild} />
      <div className={styles.gridChild} />
      <div className={styles.gridChild} />
      <div className={styles.gridChild} />
    </div>
  );
}
