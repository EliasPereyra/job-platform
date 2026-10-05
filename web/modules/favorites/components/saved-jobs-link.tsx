"use client";

import { Heart } from "reicon-react";

import { CountBadge } from "@/shared/components/count-badge/count-badge";
import { TransitionLink } from "@/shared/components/transition-link/transition-link";
import { SAVED_JOBS_HREF } from "../utils/routes";
import { useFavorites } from "../context/favorites-context";
import styles from "./saved-jobs-link.module.css";

export function SavedJobsLink({ className = "" }: { className?: string }) {
  const { ready, count } = useFavorites();

  return (
    <TransitionLink
      className={`${styles["saved-jobs-link"]} ${className}`}
      href={SAVED_JOBS_HREF}
      transitionType="nav-forward"
    >
      <Heart
        size={18}
        weight={ready && count ? "Filled" : "Outline"}
        aria-hidden
      />
      Empleos guardados
      {ready && count > 0 && <CountBadge count={count} />}
    </TransitionLink>
  );
}
