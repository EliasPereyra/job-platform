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
  company: { name: "Supermercados Don Ramiro", slug: "supermercados-don-ramiro", logo: null },
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

test("Tiene que mostrar todos los trabajos", () => {
  render(<FilterJobs jobs={jobs} total={jobs.length} />);

  expect(screen.getAllByLabelText("Tarjeta de trabajo")).toHaveLength(2);
});

test("Cuando se busque un trabajo que no exista, debe mostrarse un mensaje diciendo que no se encontraron resultados", async () => {
  const user = userEvent.setup();
  render(<FilterJobs jobs={jobs} total={jobs.length} />);

  await user.type(screen.getByRole("textbox", { name: "Buscar trabajos" }), "asdasdasdasd");
  await user.click(screen.getByRole("button", { name: "Buscar" }));

  expect(screen.getByText(/No hay trabajos relacionados con tu búsqueda/)).toBeInTheDocument();
});

test("Filtra por provincia aunque no se escriba un puesto", async () => {
  const user = userEvent.setup();
  render(<FilterJobs jobs={jobs} total={jobs.length} />);

  await user.selectOptions(screen.getByRole("combobox", { name: "Provincia" }), "Córdoba");
  await user.click(screen.getByRole("button", { name: "Buscar" }));

  const cards = screen.getAllByLabelText("Tarjeta de trabajo");
  expect(cards).toHaveLength(1);
  expect(within(cards[0]).getByText("Ayudante de barista")).toBeInTheDocument();
});

test("Con una provincia en la URL la muestra seleccionada", () => {
  const cordoba = [jobs[1]];
  render(<FilterJobs jobs={cordoba} total={cordoba.length} province="Córdoba" />);

  expect(screen.getByRole("combobox", { name: "Provincia" })).toHaveValue("Córdoba");
  expect(screen.getByText(/oferta publicada en Córdoba/)).toBeInTheDocument();
});

test("Cambiar de provincia navega a la lista filtrada por esa provincia", async () => {
  const user = userEvent.setup();
  render(<FilterJobs jobs={jobs} total={jobs.length} />);

  await user.selectOptions(screen.getByRole("combobox", { name: "Provincia" }), "Entre Ríos");
  await user.click(screen.getByRole("button", { name: "Buscar" }));

  expect(push).toHaveBeenCalledWith("/todos-los-trabajos/?provincia=Entre+R%C3%ADos", { scroll: false });
});

test("Sin ofertas en la provincia avisa que todavía no hay publicadas", () => {
  render(<FilterJobs jobs={[]} total={0} province="Formosa" />);

  expect(screen.getByText(/Todavía no hay ofertas publicadas en Formosa/)).toBeInTheDocument();
});
