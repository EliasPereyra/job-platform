import Image from "next/image";

import { SectionTitle } from "@/shared/components/section-title/section-title";
import { STEPS } from "../../constants/sections";
import band from "../../styles/band.module.css";

import styles from "./steps-section.module.css";

export function StepsSection() {
  return (
    <section className={`${band.band} ${styles.steps}`} aria-labelledby="steps-title">
      <SectionTitle id="steps-title" className={styles["steps__title"]}>
        Cómo funciona
      </SectionTitle>
      <ol className={styles["steps__list"]}>
        {STEPS.map((step, index) => (
          <li key={step.title} className={styles["steps__item"]}>
            <div className={styles["steps__frame"]}>
              <Image
                className={styles["steps__image"]}
                src={step.image}
                alt={step.alt}
                width={1600}
                height={852}
              />
            </div>
            <div className={styles["steps__content"]}>
              <span className={styles["steps__number"]} aria-hidden>
                {index + 1}
              </span>
              <h3 className={styles["steps__item-title"]}>{step.title}</h3>
              <p className={styles["steps__text"]}>{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
