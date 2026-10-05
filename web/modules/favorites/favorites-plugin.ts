import type { BetterAuthPlugin } from "better-auth";

export const FAVORITE_JOB_MODEL = "favoriteJob";

// Only declares the table, so `pnpm auth:migrate` creates it next to the auth
// tables. Reads and writes go through ./utils/favorites.ts.
export const favorites = () =>
  ({
    id: "favorites",
    schema: {
      [FAVORITE_JOB_MODEL]: {
        fields: {
          userId: {
            type: "string",
            required: true,
            references: { model: "user", field: "id", onDelete: "cascade" },
            index: true,
          },
          // The Sanity `_id` of the job, which survives slug changes.
          jobId: { type: "string", required: true },
          createdAt: { type: "date", required: true },
        },
        indexes: [{ fields: ["userId", "jobId"], unique: true }],
      },
    },
  }) satisfies BetterAuthPlugin;
