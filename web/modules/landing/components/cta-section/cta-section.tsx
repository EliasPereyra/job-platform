import { ButtonLink } from "@/shared/components/button-link/button-link";

import styles from "./cta-section.module.css";

export function CtaSection() {
  return (
    <section className={styles.cta}>
      <h2 className={styles["cta__title"]}>Empezá a buscar tu próximo trabajo hoy</h2>
      <ButtonLink variant="secondary" href="/todos-los-trabajos" transitionType="nav-forward">
        Ver ofertas de trabajo
      </ButtonLink>
    </section>
  );
}
