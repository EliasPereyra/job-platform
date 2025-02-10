import { Metadata } from "next";

import styles from "./home.module.css";
import Navigation from "@/components/Globals/Navigation/Navigation";
import Image from "next/image";
import Footer from "@/components/footer";

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

        <div className={styles.argentina} />
      </section>

      <section className={styles.companies}>
        <h2 className={styles.companiesTitle}>Confían en nosotros</h2>
        <div className={styles.companiesContainer}>
          <div className={styles.circle} />
          <div className={styles.circle} />
          <div className={styles.circle} />
          <div className={styles.circle} />
          <div className={styles.circle} />
          <div className={styles.circle} />
          <div className={styles.circle} />
          <div className={styles.circle} />
          <div className={styles.circle} />
          <div className={styles.circle} />
          <div className={styles.circle} />
          <div className={styles.circle} />
          <div className={styles.circle} />
        </div>
      </section>

      <section className={styles.firstJob}>
        <h2 className={styles.firstJobTitle}>
          Conseguí tu{" "}
          <span className={styles.firstJobTitleHighlight}>primer empleo</span>
        </h2>
        <div className={styles.firstJobContent}>
          <div className={styles.firstColumn}>
            <div className={styles.leftRectangleRounded} />
            <p className={styles.columnText}>
              Creemos que todos tienen derecho a trabajar, y para eso es
              fundamental pasar por un primer empleo que nos permita empezar a
              tener experiencia.
            </p>
            <p className={styles.columnText}>
              Por eso, en 2016, fundamos Revista Empleo con la misión de sólo
              publicar ofertas de trabajo que no requieren experiencia previa.
            </p>
          </div>
          <div className={styles.secondColumn}>
            <p className={styles.columnText}>
              Miles de empresas, organismos públicos y emprendedores/as nos
              acompañan en este camino y nos eligen para publicar sus búsquedas
              de personal. ¡Y estamos felices de ver cómo se suman cada día más
              compañías a este proyecto!
            </p>
            <p className={styles.columnText}>
              Pero lo que más alegría nos da es que vos, que estás buscando
              trabajo, lo consigas pronto.
            </p>
            <div className={styles.rightRectangleRounded} />
          </div>
        </div>
      </section>

      <section className={styles.secondJob}>
        <div>
          <Image
            src="/assets/imgs/computer.png"
            alt="Image of the computer"
            width={320}
            height={200}
          />
        </div>
        <div className={styles.secondCol}>
          <h2 className={styles.secondJobTitle}>
            Revista Empleo arma tu CV y mucho más
          </h2>
          <div className={styles.secondJobContent}>
            <p className={styles.secondJobDescription}>
              Armamos tu CV y simulamos entrevistas de trabajo para que estés
              preparado. Solicitá este servicio a nuestros profesionales de
              RR.HH.
            </p>
            <a className={styles.secondJobButton} href="#">
              Más sobre nuestros servicios
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
