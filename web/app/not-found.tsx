import Link from "next/link";

import styles from "@/modules/pages/page-template.module.css";

export default function NotFound() {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>No encontramos esta página</h2>
      <p className={styles.description}>
        Puede que la oferta ya no esté publicada o que el enlace sea incorrecto.{" "}
        <Link className={styles.link} href="/todos-los-trabajos">
          Ver todas las ofertas
        </Link>
      </p>
    </section>
  );
}
