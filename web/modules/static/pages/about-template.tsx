import { PageTransition } from "@/shared/components/page-transition/page-transition";

import styles from "./page-template.module.css";

export default function AboutTemplate() {
  return (
    <PageTransition>
      <section className={styles["text-page"]}>
        <h1 className={styles["text-page__title"]}>Sobre nosotros</h1>
        <div className={styles["text-page__body"]}>
          <p className={styles["text-page__lead"]}>
            Creemos que todos merecen la oportunidad de trabajar, y dar el
            primer paso en el mundo laboral es clave para ganar experiencia.
          </p>
          <p>
            Por eso, creamos WorkStart con la misión de acercarte oportunidades de
            empleo que no requieran experiencia previa.
          </p>
          <p>
            Desde entonces, decenas de empresas, organismos públicos y
            emprendedores han confiado en nosotros para conectar con nuevos
            talentos. Nos enorgullece ver cómo cada vez más compañías se suman a
            esta iniciativa.
          </p>
          <p>
            Pero lo que más nos impulsa es saber que vos, que estás dando tus
            primeros pasos en el mundo laboral, puedas encontrar tu oportunidad lo
            antes posible.
          </p>
        </div>
      </section>
    </PageTransition>
  );
}
