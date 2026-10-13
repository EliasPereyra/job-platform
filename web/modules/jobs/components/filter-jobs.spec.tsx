import { afterEach, expect, test, vi } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { JobCardData } from "@/modules/cms";
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
    categories: [{ _id: "cat-1", name: "Primer empleo" }],
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
  }),
];

afterEach(() => {
  cleanup();
  push.mockClear();
});

test("Shows every job", () => {
  render(<FilterJobs jobs={jobs} total={jobs.length} />);

  expect(screen.getAllByLabelText("Tarjeta de trabajo")).toHaveLength(2);
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
