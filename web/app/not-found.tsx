import Link from "next/link";

import styles from "@/modules/static/pages/page-template.module.css";

export default function NotFound() {
  return (
    <section className={styles["text-page"]}>
      <h1 className={styles["text-page__title"]}>No encontramos esta página</h1>
      <p className={styles["text-page__body"]}>
        Puede que la oferta ya no esté publicada o que el enlace sea incorrecto.
      </p>
      <p>
        <Link className={styles["text-page__link"]} href="/todos-los-trabajos">
          Ver todas las ofertas
        </Link>
      </p>
    </section>
  );
}
