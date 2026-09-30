import { PageTransition } from "@/shared/components/page-transition/page-transition";

import styles from "./page-template.module.css";

export default function ContactTemplate() {
  return (
    <PageTransition>
      <section className={styles["text-page"]}>
        <h1 className={styles["text-page__title"]}>Contacto</h1>
        <div className={styles["text-page__body"]}>
          <p className={styles["text-page__lead"]}>
            ¿Tenés dudas o querés publicar una oferta laboral en WorkStart?
          </p>
          <p>
            Escribinos por{" "}
            <a className={styles["text-page__link"]} href="mailto:contacto@xperience.com">
              correo
            </a>{" "}
            o por{" "}
            <a className={styles["text-page__link"]} href="https://wa.me/549115555-5555">
              WhatsApp
            </a>
            .
          </p>
        </div>
      </section>
    </PageTransition>
  );
}
