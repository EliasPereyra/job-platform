import type { ComponentProps } from "react";

import { TransitionLink } from "../transition-link/transition-link";
import styles from "./button-link.module.css";

type ButtonLinkProps = ComponentProps<typeof TransitionLink> & {
  variant?: "primary" | "secondary";
};

// A link that looks like a pill button: solid purple, or white over color.
export function ButtonLink({ variant = "primary", className = "", ...props }: ButtonLinkProps) {
  return (
    <TransitionLink
      className={`${styles.button} ${styles[`button--${variant}`]} ${className}`}
      {...props}
    />
  );
}
