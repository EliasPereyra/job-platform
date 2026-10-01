import type { ComponentProps } from "react";

import styles from "./section-title.module.css";

// Section heading with the two-tone tab above it.
export function SectionTitle({ className = "", ...props }: ComponentProps<"h2">) {
  return <h2 className={`${styles["section-title"]} ${className}`} {...props} />;
}
