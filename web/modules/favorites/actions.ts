"use server";

import { getSession } from "@/modules/auth/utils/session";
import {
  addFavoriteJob,
  listFavoriteJobIds,
  removeFavoriteJob,
} from "./utils/favorites";

export type FavoriteResult =
  | { ok: true }
  | { ok: false; reason: "unauthenticated" | "error" };

// Sanity document ids: letters, digits, dots, dashes and underscores.
const isJobId = (value: unknown): value is string =>
  typeof value === "string" && /^[\w.-]{1,128}$/.test(value);

export async function getFavoriteJobIds(): Promise<string[]> {
  const session = await getSession();
  if (!session) return [];

  return listFavoriteJobIds(session.user.id);
}

export async function setJobFavorite(
  jobId: string,
  saved: boolean,
): Promise<FavoriteResult> {
  if (!isJobId(jobId) || typeof saved !== "boolean")
    return { ok: false, reason: "error" };

  const session = await getSession();
  if (!session) return { ok: false, reason: "unauthenticated" };

  try {
    if (saved) await addFavoriteJob(session.user.id, jobId);
    else await removeFavoriteJob(session.user.id, jobId);

    return { ok: true };
  } catch (error) {
    console.error("Could not update the saved job", error);
    return { ok: false, reason: "error" };
  }
}
