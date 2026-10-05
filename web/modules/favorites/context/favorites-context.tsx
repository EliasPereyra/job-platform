"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  use,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";

import { authClient } from "@/modules/auth/auth-client";
import { getFavoriteJobIds, setJobFavorite } from "../actions";
import { SAVED_JOBS_HREF } from "../utils/routes";

type FavoriteJob = { _id: string; title: string };

type FavoritesContextValue = {
  // False until the saved ids of the signed-in user are loaded.
  ready: boolean;
  count: number;
  isSaved: (jobId: string) => boolean;
  isPending: (jobId: string) => boolean;
  toggle: (job: FavoriteJob) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function useFavorites() {
  const context = use(FavoritesContext);
  if (!context)
    throw new Error("useFavorites must be used inside <FavoritesProvider>");
  return context;
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending: sessionPending } = authClient.useSession();
  const userId = session?.user.id ?? null;

  const [saved, setSaved] = useState<{
    userId: string | null;
    ids: Set<string>;
  } | null>(null);
  const [pending, setPending] = useState<ReadonlySet<string>>(new Set());

  useEffect(() => {
    if (!userId) return;
    let cancelled = false;

    getFavoriteJobIds()
      .then((ids) => !cancelled && setSaved({ userId, ids: new Set(ids) }))
      .catch(() => !cancelled && setSaved({ userId, ids: new Set() }));

    return () => {
      cancelled = true;
    };
  }, [userId]);

  const ids = useMemo(
    () => (saved && saved.userId === userId ? saved.ids : new Set<string>()),
    [saved, userId],
  );
  const ready = !sessionPending && (!userId || saved?.userId === userId);

  // Urgent on purpose: inside a transition React would hold the heart until
  // the Server Action (itself a transition) finishes.
  const update = useCallback((jobId: string, value: boolean) => {
    setSaved((current) => {
      if (!current) return current;

      const next = new Set(current.ids);
      if (value) next.add(jobId);
      else next.delete(jobId);

      return { ...current, ids: next };
    });
  }, []);

  const setFavorite = useCallback(
    (job: FavoriteJob, value: boolean) => {
      async function persist(value: boolean) {
        update(job._id, value);
        setPending((current) => new Set(current).add(job._id));

        const result = await setJobFavorite(job._id, value);

        setPending((current) => {
          const next = new Set(current);
          next.delete(job._id);

          return next;
        });

        if (!result.ok) {
          update(job._id, !value);
          toast.error(
            result.reason === "unauthenticated"
              ? "Tu sesión expiró. Volvé a ingresar para guardar empleos."
              : "No pudimos actualizar tus empleos guardados. Probá de nuevo.",
          );
          return;
        }

        if (value) {
          toast.success("Empleo guardado en favoritos", {
            id: `favorite-${job._id}`,
            description: job.title,
            action: {
              label: "Ver guardados",
              onClick: () => router.push(SAVED_JOBS_HREF),
            },
          });
        } else {
          toast("Quitaste el empleo de favoritos", {
            id: `favorite-${job._id}`,
            description: job.title,
            action: { label: "Deshacer", onClick: () => void persist(true) },
          });
        }
      }

      return persist(value);
    },
    [router, update],
  );

  const toggle = useCallback(
    (job: FavoriteJob) => {
      if (!userId) {
        toast("Ingresá para guardar empleos", {
          id: "favorite-sign-in",
          description:
            "Guardá las ofertas que te gustan y encontralas desde tu perfil.",
          action: {
            label: "Ingresar",
            onClick: () =>
              router.push(`/ingresar/?next=${encodeURIComponent(pathname)}`),
          },
        });
        return;
      }
      if (!ready || pending.has(job._id)) return;

      void setFavorite(job, !ids.has(job._id));
    },
    [userId, ready, pending, ids, pathname, router, setFavorite],
  );

  const value = useMemo<FavoritesContextValue>(
    () => ({
      ready,
      count: ids.size,
      isSaved: (jobId) => ids.has(jobId),
      isPending: (jobId) => pending.has(jobId),
      toggle,
    }),
    [ready, ids, pending, toggle],
  );

  return <FavoritesContext value={value}>{children}</FavoritesContext>;
}
