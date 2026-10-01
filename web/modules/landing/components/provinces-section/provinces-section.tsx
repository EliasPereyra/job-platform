import { ProvinceMap } from "@/modules/jobs/components/province-map/province-map";
import { jobsHref } from "@/modules/jobs/utils/jobs-href";
import { SectionTitle } from "@/shared/components/section-title/section-title";
import { TransitionLink } from "@/shared/components/transition-link/transition-link";
import band from "../../styles/band.module.css";

import styles from "./provinces-section.module.css";

export function ProvincesSection({ counts }: { counts: Record<string, number> }) {
  const provinces = Object.entries(counts).sort(
    ([nameA, a], [nameB, b]) => b - a || nameA.localeCompare(nameB, "es"),
  );
  if (provinces.length === 0) return null;

  return (
    <section className={`${band.band} ${styles.provinces}`} aria-labelledby="provinces-title">
      <div className={styles["provinces__intro"]}>
        <SectionTitle id="provinces-title" className={styles["provinces__title"]}>
          Ofertas en todo el país
        </SectionTitle>
        <p className={styles["provinces__lead"]}>
          Elegí una provincia en el mapa o en la lista para ver sus ofertas.
        </p>
        <ul className={styles["provinces__list"]}>
          {provinces.map(([province, count]) => (
            <li key={province}>
              <TransitionLink
                className={styles["provinces__link"]}
                href={jobsHref({ province })}
                transitionType="nav-forward"
                aria-label={`${province}: ${count} ${count === 1 ? "oferta" : "ofertas"}`}
              >
                {province}
                <span className={styles["provinces__count"]}>{count}</span>
              </TransitionLink>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles["provinces__map"]}>
        <ProvinceMap counts={counts} />
        <div className={styles["provinces__legend"]} aria-hidden>
          <span>Menos ofertas</span>
          <span className={styles["provinces__legend-scale"]} />
          <span>Más ofertas</span>
        </div>
      </div>
    </section>
  );
}
