import { auth } from "@/modules/auth/auth";
import { FAVORITE_JOB_MODEL } from "../favorites-plugin";

type FavoriteJob = {
  id: string;
  userId: string;
  jobId: string;
  createdAt: Date;
};

async function getAdapter() {
  return (await auth.$context).adapter;
}

// Newest first. Without `limit`, every saved job.
export async function listFavoriteJobIds(
  userId: string,
  { limit, offset }: { limit?: number; offset?: number } = {},
) {
  const adapter = await getAdapter();
  const rows = await adapter.findMany<FavoriteJob>({
    model: FAVORITE_JOB_MODEL,
    where: [{ field: "userId", value: userId }],
    sortBy: { field: "createdAt", direction: "desc" },
    limit,
    offset,
  });

  return rows.map((row) => row.jobId);
}

export async function countFavoriteJobs(userId: string) {
  const adapter = await getAdapter();
  return adapter.count({
    model: FAVORITE_JOB_MODEL,
    where: [{ field: "userId", value: userId }],
  });
}

export async function addFavoriteJob(userId: string, jobId: string) {
  const adapter = await getAdapter();
  const where = [
    { field: "userId", value: userId },
    { field: "jobId", value: jobId },
  ];
  if (await adapter.findOne<FavoriteJob>({ model: FAVORITE_JOB_MODEL, where }))
    return;

  await adapter.create<Omit<FavoriteJob, "id">>({
    model: FAVORITE_JOB_MODEL,
    data: { userId, jobId, createdAt: new Date() },
  });
}

export async function removeFavoriteJob(userId: string, jobId: string) {
  const adapter = await getAdapter();
  await adapter.deleteMany({
    model: FAVORITE_JOB_MODEL,
    where: [
      { field: "userId", value: userId },
      { field: "jobId", value: jobId },
    ],
  });
}
