import { evaluate, parse } from "groq-js";
import { describe, expect, test } from "vitest";

import { JOB_CATEGORIES_QUERY, JOBS_COUNT_QUERY, JOBS_PAGE_QUERY } from "./queries";

// In-memory dataset: groq-js resolves the `->` references between documents.
const category = (slug: string, name: string) => ({
  _id: `cat-${slug}`,
  _type: "jobCategory",
  name,
  slug: { _type: "slug", current: slug },
});

const ref = (slug: string) => ({ _type: "reference", _ref: `cat-${slug}`, _key: slug });

const job = (id: string, province: string, categories: string[], daysAgo: number) => ({
  _id: id,
  _type: "job",
  title: id,
  slug: { _type: "slug", current: id },
  publishedAt: new Date(Date.UTC(2026, 9, 1) - daysAgo * 86_400_000).toISOString(),
  province,
  categories: categories.map(ref),
  company: { _type: "reference", _ref: "company-1" },
});

const dataset = [
  { _id: "company-1", _type: "company", name: "Acme", slug: { _type: "slug", current: "acme" } },
  category("gastronomia", "Gastronomía"),
  category("ventas", "Ventas y comercio"),
  category("transporte", "Transporte"),
  job("barista-cordoba", "Córdoba", ["gastronomia"], 1),
  job("mozo-caba", "CABA", ["gastronomia", "ventas"], 2),
  job("cajero-caba", "CABA", ["ventas"], 3),
  job("cocinero-cordoba", "Córdoba", ["gastronomia"], 4),
  job("sin-categoria", "CABA", [], 5),
  // Drafts without a slug never show up.
  { ...job("borrador", "CABA", ["gastronomia"], 0), slug: undefined },
];

// Params also go to `parse`: the page slice needs them to be constants.
const run = async (query: string, params: Record<string, unknown>) =>
  (await evaluate(parse(query, { params }), { dataset, params })).get();

const page = (params: { province?: string | null; category?: string | null }) =>
  run(JOBS_PAGE_QUERY, { start: 0, end: 10, province: null, category: null, ...params });

const count = (params: { province?: string | null; category?: string | null }) =>
  run(JOBS_COUNT_QUERY, { province: null, category: null, ...params });

const slugs = (jobs: { slug: string }[]) => jobs.map(({ slug }) => slug);

describe("JOBS_PAGE_QUERY / JOBS_COUNT_QUERY", () => {
  test("returns every published job, newest first, without filters", async () => {
    expect(slugs(await page({}))).toEqual([
      "barista-cordoba",
      "mozo-caba",
      "cajero-caba",
      "cocinero-cordoba",
      "sin-categoria",
    ]);
    expect(await count({})).toBe(5);
  });

  test("filters by category, including jobs with several categories", async () => {
    expect(slugs(await page({ category: "gastronomia" }))).toEqual([
      "barista-cordoba",
      "mozo-caba",
      "cocinero-cordoba",
    ]);
    expect(await count({ category: "gastronomia" })).toBe(3);

    expect(slugs(await page({ category: "ventas" }))).toEqual(["mozo-caba", "cajero-caba"]);
    expect(await count({ category: "ventas" })).toBe(2);
  });

  test("combines category and province", async () => {
    expect(slugs(await page({ category: "gastronomia", province: "CABA" }))).toEqual(["mozo-caba"]);
    expect(await count({ category: "gastronomia", province: "CABA" })).toBe(1);
  });

  test("returns an empty list for a category without jobs", async () => {
    expect(await page({ category: "transporte" })).toEqual([]);
    expect(await count({ category: "transporte" })).toBe(0);
  });

  test("paginates over the filtered results", async () => {
    const second = await run(JOBS_PAGE_QUERY, {
      start: 1,
      end: 3,
      province: null,
      category: "gastronomia",
    });
    expect(slugs(second)).toEqual(["mozo-caba", "cocinero-cordoba"]);
  });

  test("cards include each category's slug", async () => {
    const [mozo] = await page({ province: "CABA", category: "gastronomia" });
    expect(mozo.categories).toEqual([
      { _id: "cat-gastronomia", name: "Gastronomía", slug: "gastronomia" },
      { _id: "cat-ventas", name: "Ventas y comercio", slug: "ventas" },
    ]);
  });
});

describe("JOB_CATEGORIES_QUERY", () => {
  test("lists the categories sorted by name", async () => {
    expect(await run(JOB_CATEGORIES_QUERY, {})).toEqual([
      { _id: "cat-gastronomia", name: "Gastronomía", slug: "gastronomia" },
      { _id: "cat-transporte", name: "Transporte", slug: "transporte" },
      { _id: "cat-ventas", name: "Ventas y comercio", slug: "ventas" },
    ]);
  });
});
