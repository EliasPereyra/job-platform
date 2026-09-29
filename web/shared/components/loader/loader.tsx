import type { CSSProperties } from "react";

import styles from "./loader.module.css";

const DOTS = Array.from(
  { length: 9 },
  (_, index) => Math.floor(index / 3) + (index % 3),
);

export function Loader() {
  return (
    <div className={styles.loader} role="status" aria-label="Cargando">
      {DOTS.map((step, index) => (
        <div
          key={index}
          className={styles["loader__dot"]}
          style={{ "--loader-index": step } as CSSProperties}
        />
      ))}
    </div>
  );
}
