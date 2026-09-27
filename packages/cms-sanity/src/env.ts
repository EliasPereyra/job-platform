function required(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(`Missing environment variable: ${name}. See web/.env.example`);
  }
  return value;
}

// NEXT_PUBLIC_* must be read with the literal `process.env.X` expression so
// Next.js can inline them in client bundles.
export const projectId = required(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
);
export const dataset = required(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "NEXT_PUBLIC_SANITY_DATASET",
);
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-09-01";
export const studioUrl =
  process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || "http://localhost:3333";

// Viewer token. Only needed for draft mode / Visual Editing; published
// content is readable without it because the dataset is public.
export const readToken = process.env.SANITY_API_READ_TOKEN;
