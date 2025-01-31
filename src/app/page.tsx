import { Metadata } from "next";

import styles from "./home.module.css";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Trabajos exclusivos que no requieren experiencia laboral previa. Mira la lista de trabajos publicados y postula en aquellos en que destacas.",
};

export default function Home() {
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>
        Ofertas de trabajo{" "}
        <span className={styles.highlight}>sin experiencia</span>
      </h1>
      <a className={styles.button} href="/todos-los-trabajos">
        Ver trabajos
      </a>

      <div className={styles.lastJobs}>
        <p>Últimas vacantes publicadas</p>
      </div>
    </section>
  );
}
