import { SectionTitle } from "@/shared/components/section-title/section-title";
import { BENEFITS } from "../../constants/sections";

import styles from "./benefits-section.module.css";

export function BenefitsSection() {
  return (
    <section className={styles.benefits} aria-labelledby="benefits-title">
      <SectionTitle id="benefits-title" className={styles["benefits__title"]}>
        Pensado para tu primer trabajo
      </SectionTitle>
      <ul className={styles["benefits__list"]}>
        {BENEFITS.map(({ icon: Icon, tone, title, text }) => (
          <li
            key={title}
            className={`${styles["benefits__item"]} ${styles[`benefits__item--${tone}`]}`}
          >
            <span className={styles["benefits__icon"]}>
              <Icon size={24} aria-hidden />
            </span>
            <h3 className={styles["benefits__item-title"]}>{title}</h3>
            <p className={styles["benefits__text"]}>{text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
