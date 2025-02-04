import { Metadata } from "next";

import styles from "./home.module.css";
import Navigation from "@/components/Globals/Navigation/Navigation";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Trabajos exclusivos que no requieren experiencia laboral previa. Mira la lista de trabajos publicados y postula en aquellos en que destacas.",
};

export default function Home() {
  return (
    <div className={styles.home}>
      <Navigation />

      <section className={styles.container}>
        <div className={styles.element} />
        <h1 className={styles.title}>
          Ofertas de trabajo{" "}
          <span className={styles.highlight}>sin experiencia</span>
        </h1>
        <p className={styles.description}>
          Disponibles desde distintas provincias y localidades, comienza tu
          próxima trayectoria laboral
        </p>
        <a className={styles.button} href="/todos-los-trabajos">
          Ver trabajos
        </a>

        <div className={styles.lastJobs}>
          <p>Últimas vacantes publicadas</p>
        </div>
        <div className={styles.argentina} />
      </section>
    </div>
  );
}
