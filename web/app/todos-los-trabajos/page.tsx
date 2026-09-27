import type { Metadata } from "next";

import { getJobsPage } from "@/modules/cms";
import FilterJobs from "@/modules/jobs/components/filter-jobs";
import { Pagination } from "@/modules/jobs/components/pagination";

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
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number.parseInt(pageParam ?? "1", 10) || 1);
  const { jobs, total, totalPages } = await getJobsPage({ page, pageSize: PAGE_SIZE });

  return (
    <section className={styles.container}>
      {/* key: reset the client-side filter when the page changes */}
      <FilterJobs key={page} jobs={jobs} total={total} />
      <Pagination page={Math.min(page, totalPages)} totalPages={totalPages} />
    </section>
  );
}
