import { afterEach, expect, test, vi } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { JobCardData, JobCategory } from "@/modules/cms";
import FilterJobs from "./filter-jobs";

// The card renders images through the Sanity URL builder; the tests only care
// about the filtering logic.
vi.mock("@/modules/cms/cms-image", () => ({ CmsImage: () => null }));
// Changing the province navigates through the App Router.
const push = vi.fn();
vi.mock("next/navigation", () => ({ useRouter: () => ({ push }) }));
vi.mock("@/modules/favorites/context/favorites-context", () => ({
  useFavorites: () => ({
    ready: true,
    count: 0,
    isSaved: () => false,
    isPending: () => false,
    toggle: () => {},
  }),
}));

// Plain strings stand in for the (stega-branded) CMS strings.
const job = (overrides: Record<string, unknown>) =>
  ({
    _id: "job-1",
    title: "Repositor/a de góndola",
    slug: "repositor-a-de-gondola",
    publishedAt: "2026-09-20T12:00:00.000Z",
    available: true,
    province: "Buenos Aires",
    city: "Lomas de Zamora",
    modality: "presencial",
    workingDay: "full-time",
    salary: "$980.000 brutos mensuales",
    categories: [{ _id: "cat-primer-empleo", name: "Primer empleo", slug: "primer-empleo" }],
    company: {
      name: "Supermercados Don Ramiro",
      slug: "supermercados-don-ramiro",
      logo: null,
    },
    ...overrides,
  }) as unknown as JobCardData;

const jobs = [
  job({}),
  job({
    _id: "job-2",
    title: "Ayudante de barista",
    slug: "ayudante-de-barista",
    province: "Córdoba",
    city: "Nueva Córdoba",
    categories: [
      { _id: "cat-gastronomia", name: "Gastronomía", slug: "gastronomia" },
      { _id: "cat-primer-empleo", name: "Primer empleo", slug: "primer-empleo" },
    ],
  }),
  job({
    _id: "job-3",
    title: "Mozo/a para turno noche",
    slug: "mozo-a-para-turno-noche",
    province: "CABA",
    city: "San Telmo",
    categories: [{ _id: "cat-gastronomia", name: "Gastronomía", slug: "gastronomia" }],
  }),
];

const categories = [
  { _id: "cat-gastronomia", name: "Gastronomía", slug: "gastronomia" },
  { _id: "cat-primer-empleo", name: "Primer empleo", slug: "primer-empleo" },
  { _id: "cat-transporte", name: "Transporte", slug: "transporte" },
] as JobCategory[];

const cardTitles = () =>
  screen
    .queryAllByLabelText("Tarjeta de trabajo")
    .map((card) => within(card).getByRole("heading").textContent);

afterEach(() => {
  cleanup();
  push.mockClear();
});

test("Shows every job", () => {
  render(<FilterJobs jobs={jobs} total={jobs.length} />);

  expect(screen.getAllByLabelText("Tarjeta de trabajo")).toHaveLength(3);
});

test("Shows a no-results message when searching for a job that doesn't exist", async () => {
  const user = userEvent.setup();
  render(<FilterJobs jobs={jobs} total={jobs.length} />);

  await user.type(
    screen.getByRole("textbox", { name: "Buscar trabajos" }),
    "asdasdasdasd",
  );
  await user.click(screen.getByRole("button", { name: "Buscar" }));

  expect(
    screen.getByText(/No hay trabajos relacionados con tu búsqueda/),
  ).toBeInTheDocument();
});

test("Filters by province without typing a job title", async () => {
  const user = userEvent.setup();
  render(<FilterJobs jobs={jobs} total={jobs.length} />);

  await user.selectOptions(
    screen.getByRole("combobox", { name: "Provincia" }),
    "Córdoba",
  );
  await user.click(screen.getByRole("button", { name: "Buscar" }));

  const cards = screen.getAllByLabelText("Tarjeta de trabajo");
  expect(cards).toHaveLength(1);
  expect(within(cards[0]).getByText("Ayudante de barista")).toBeInTheDocument();
});

test("Preselects the province from the URL", () => {
  const cordoba = [jobs[1]];
  render(
    <FilterJobs jobs={cordoba} total={cordoba.length} province="Córdoba" />,
  );

  expect(screen.getByRole("combobox", { name: "Provincia" })).toHaveValue(
    "Córdoba",
  );
  expect(screen.getByText(/oferta publicada en Córdoba/)).toBeInTheDocument();
});

test("Changing the province navigates to the list filtered by it", async () => {
  const user = userEvent.setup();
  render(<FilterJobs jobs={jobs} total={jobs.length} />);

  await user.selectOptions(
    screen.getByRole("combobox", { name: "Provincia" }),
    "Entre Ríos",
  );
  await user.click(screen.getByRole("button", { name: "Buscar" }));

  expect(push).toHaveBeenCalledWith(
    "/todos-los-trabajos/?provincia=Entre+R%C3%ADos",
    { scroll: false },
  );
});

test("Says there are no jobs yet when the province has none", () => {
  render(<FilterJobs jobs={[]} total={0} province="Formosa" />);

  expect(
    screen.getByText(/Todavía no hay ofertas publicadas en Formosa/),
  ).toBeInTheDocument();
});

test("Lists the categories in the select", () => {
  render(<FilterJobs jobs={jobs} total={jobs.length} categories={categories} />);

  const select = screen.getByRole("combobox", { name: "Categoría" });
  expect(within(select).getAllByRole("option").map((option) => option.textContent)).toEqual([
    "Todas las categorías",
    "Gastronomía",
    "Primer empleo",
    "Transporte",
  ]);
  expect(select).toHaveValue("");
});

test("Filters by category without typing a job title", async () => {
  const user = userEvent.setup();
  render(<FilterJobs jobs={jobs} total={jobs.length} categories={categories} />);

  await user.selectOptions(screen.getByRole("combobox", { name: "Categoría" }), "Gastronomía");
  await user.click(screen.getByRole("button", { name: "Buscar" }));

  expect(cardTitles()).toEqual(["Ayudante de barista", "Mozo/a para turno noche"]);
});

test("Combines the category with the province and the job title", async () => {
  const user = userEvent.setup();
  render(<FilterJobs jobs={jobs} total={jobs.length} categories={categories} />);

  await user.selectOptions(screen.getByRole("combobox", { name: "Categoría" }), "Gastronomía");
  await user.selectOptions(screen.getByRole("combobox", { name: "Provincia" }), "CABA");
  await user.click(screen.getByRole("button", { name: "Buscar" }));
  expect(cardTitles()).toEqual(["Mozo/a para turno noche"]);

  await user.selectOptions(screen.getByRole("combobox", { name: "Provincia" }), "");
  await user.type(screen.getByRole("textbox", { name: "Buscar trabajos" }), "barista");
  await user.click(screen.getByRole("button", { name: "Buscar" }));
  expect(cardTitles()).toEqual(["Ayudante de barista"]);
});

test("Changing the category navigates to the list filtered by it", async () => {
  const user = userEvent.setup();
  render(<FilterJobs jobs={jobs} total={jobs.length} categories={categories} />);

  await user.selectOptions(screen.getByRole("combobox", { name: "Categoría" }), "Transporte");
  await user.click(screen.getByRole("button", { name: "Buscar" }));

  expect(push).toHaveBeenCalledWith("/todos-los-trabajos/?categoria=transporte", {
    scroll: false,
  });
});

test("Keeps the province from the URL when picking a category", async () => {
  const user = userEvent.setup();
  const cordoba = [jobs[1]];
  render(
    <FilterJobs jobs={cordoba} total={cordoba.length} province="Córdoba" categories={categories} />,
  );

  await user.selectOptions(screen.getByRole("combobox", { name: "Categoría" }), "Gastronomía");
  await user.click(screen.getByRole("button", { name: "Buscar" }));

  expect(push).toHaveBeenCalledWith(
    "/todos-los-trabajos/?provincia=C%C3%B3rdoba&categoria=gastronomia",
    { scroll: false },
  );
});

test("Doesn't navigate when only the job title changes", async () => {
  const user = userEvent.setup();
  render(
    <FilterJobs jobs={jobs} total={jobs.length} categories={categories} category="gastronomia" />,
  );

  await user.type(screen.getByRole("textbox", { name: "Buscar trabajos" }), "mozo");
  await user.click(screen.getByRole("button", { name: "Buscar" }));

  expect(push).not.toHaveBeenCalled();
});

test("Preselects the category from the URL", () => {
  const gastronomia = [jobs[1], jobs[2]];
  render(
    <FilterJobs
      jobs={gastronomia}
      total={gastronomia.length}
      categories={categories}
      category="gastronomia"
    />,
  );

  expect(screen.getByRole("combobox", { name: "Categoría" })).toHaveValue("gastronomia");
  expect(screen.getByText(/ofertas publicadas de Gastronomía\./)).toBeInTheDocument();
  expect(cardTitles()).toEqual(["Ayudante de barista", "Mozo/a para turno noche"]);
});

test("Sums up both filters when the URL has a category and a province", () => {
  render(
    <FilterJobs
      jobs={[jobs[2]]}
      total={1}
      province="CABA"
      categories={categories}
      category="gastronomia"
    />,
  );

  expect(screen.getByText(/oferta publicada de Gastronomía en CABA/)).toBeInTheDocument();
});

test("Says there are no jobs yet when the category has none", () => {
  render(<FilterJobs jobs={[]} total={0} categories={categories} category="transporte" />);

  expect(
    screen.getByText("Todavía no hay ofertas publicadas de Transporte. Probá con otra categoría."),
  ).toBeInTheDocument();
});

test("Suggests changing either filter when the category and province have no jobs", () => {
  render(
    <FilterJobs
      jobs={[]}
      total={0}
      province="Formosa"
      categories={categories}
      category="transporte"
    />,
  );

  expect(
    screen.getByText(
      "Todavía no hay ofertas publicadas de Transporte en Formosa. Probá con otra provincia u otra categoría.",
    ),
  ).toBeInTheDocument();
});

test('"Ver todas las ofertas" clears the category and goes back to the full list', async () => {
  const user = userEvent.setup();
  render(<FilterJobs jobs={[]} total={0} categories={categories} category="transporte" />);

  await user.click(screen.getByRole("button", { name: "Ver todas las ofertas" }));

  expect(screen.getByRole("combobox", { name: "Categoría" })).toHaveValue("");
  expect(push).toHaveBeenCalledWith("/todos-los-trabajos/", { scroll: false });
});
