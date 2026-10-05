import type { Metadata } from "next";

import SavedJobsPage from "@/modules/favorites/pages/saved-jobs-page";

export const metadata: Metadata = {
  title: "Empleos guardados",
  robots: { index: false },
};

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  return <SavedJobsPage searchParams={searchParams} />;
}
