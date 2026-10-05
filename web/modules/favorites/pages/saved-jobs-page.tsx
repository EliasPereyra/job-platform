import { redirect } from "next/navigation";

import { getSession } from "@/modules/auth/utils/session";
import { getJobsByIds } from "@/modules/cms";
import { Pagination } from "@/modules/jobs/components/pagination";
import { SavedJobsList } from "../components/saved-jobs-list";
import { countFavoriteJobs, listFavoriteJobIds } from "../utils/favorites";
import { SAVED_JOBS_HREF, savedJobsHref } from "../utils/routes";
import styles from "./saved-jobs-page.module.css";

const PAGE_SIZE = 10;

export default async function SavedJobsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const session = await getSession();
  if (!session) redirect(`/ingresar/?next=${SAVED_JOBS_HREF}`);

  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number.parseInt(pageParam ?? "1", 10) || 1);
  const total = await countFavoriteJobs(session.user.id);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  // e.g. after unsaving every job of the last page
  if (page > totalPages) redirect(savedJobsHref(totalPages));

  const ids = await listFavoriteJobIds(session.user.id, {
    limit: PAGE_SIZE,
    offset: (page - 1) * PAGE_SIZE,
  });
  const jobs = await getJobsByIds(ids);

  return (
    <section className={styles["saved-jobs"]}>
      <header className={styles["saved-jobs__intro"]}>
        <h1 className={styles["saved-jobs__title"]}>Empleos guardados</h1>
        <p className={styles["saved-jobs__lead"]}>
          Las ofertas que marcaste con el corazón, de la más reciente a la más
          antigua.
        </p>
      </header>
      {/* key: start from the server list again on every page */}
      <SavedJobsList key={page} jobs={jobs} hasOtherPages={totalPages > 1} />
      <Pagination page={page} totalPages={totalPages} href={savedJobsHref} />
    </section>
  );
}
