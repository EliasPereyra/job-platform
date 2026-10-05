"use client";

import { Heart } from "reicon-react";

import { useFavorites } from "../context/favorites-context";
import styles from "./favorite-button.module.css";

type FavoriteButtonProps = {
  job: { _id: string; title: string };
  variant?: "icon" | "labeled";
  className?: string;
};

export function FavoriteButton({
  job,
  variant = "icon",
  className = "",
}: FavoriteButtonProps) {
  const { isSaved, isPending, toggle } = useFavorites();
  const saved = isSaved(job._id);
  const label = saved ? "Guardado" : "Guardar";

  return (
    <button
      type="button"
      className={`${styles["favorite-button"]} ${styles[`favorite-button--${variant}`]} ${className}`}
      aria-pressed={saved}
      aria-label={variant === "icon" ? `${label} en favoritos` : undefined}
      title={saved ? "Quitar de favoritos" : "Guardar en favoritos"}
      aria-busy={isPending(job._id)}
      onClick={() => toggle(job)}
    >
      <Heart
        className={styles["favorite-button__icon"]}
        size={variant === "icon" ? 20 : 18}
        weight={saved ? "Filled" : "Outline"}
        aria-hidden
      />
      {variant === "labeled" && <span>{label}</span>}
    </button>
  );
}
