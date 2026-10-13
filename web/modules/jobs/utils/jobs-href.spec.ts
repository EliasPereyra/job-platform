import { expect, test } from "vitest";

import { jobsHref } from "./jobs-href";

test("Points to the full list without filters", () => {
  expect(jobsHref()).toBe("/todos-los-trabajos/");
});

test("Adds the category to the URL", () => {
  expect(jobsHref({ category: "gastronomia" })).toBe("/todos-los-trabajos/?categoria=gastronomia");
});

test("Combines province, category and page", () => {
  expect(jobsHref({ province: "Córdoba", category: "gastronomia", page: 2 })).toBe(
    "/todos-los-trabajos/?provincia=C%C3%B3rdoba&categoria=gastronomia&page=2",
  );
});

test("Leaves out an empty category and the first page", () => {
  expect(jobsHref({ province: "CABA", category: null, page: 1 })).toBe(
    "/todos-los-trabajos/?provincia=CABA",
  );
});
