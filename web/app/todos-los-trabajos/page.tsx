import type { Metadata } from "next";
import { getJobsPage } from "@/modules/cms";
import FilterJobs from "@/modules/jobs/components/filter-jobs";
import { Pagination } from "@/modules/jobs/components/pagination";
import { PageTransition } from "@/shared/components/page-transition/page-transition";
import { isProvince } from "@/shared/utils/provinces";

import styles from "./page.module.css";

const PAGE_SIZE = 10;

export const metadata: Metadata = {
  title: "Todos los trabajos",
  description: "Ofertas de empleo sin experiencia publicadas por empresas de toda Argentina.",
  alternates: { canonical: "/todos-los-trabajos/" },
};

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; provincia?: string }>;
}) {
  const { page: pageParam, provincia } = await searchParams;
  const page = Math.max(1, Number.parseInt(pageParam ?? "1", 10) || 1);
  const province = isProvince(provincia) ? provincia : null;
  const { jobs, total, totalPages } = await getJobsPage({ page, pageSize: PAGE_SIZE, province });

  return (
    <PageTransition>
      <section className={styles["jobs-page"]}>
        {/* key: reset the client-side filter when the page changes */}
        <FilterJobs key={page} jobs={jobs} total={total} page={page} province={province} />
        <Pagination page={Math.min(page, totalPages)} totalPages={totalPages} province={province} />
      </section>
    </PageTransition>
  );
}
