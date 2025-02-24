import { test, expect, beforeAll, afterEach, afterAll } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";

import FilterJobs from "./filter-jobs";
import { handlers } from "@/mocks/handlers";

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});

render(<FilterJobs jobs={handlers.values()} />);

test("Tiene que mostrar todos los trabajos", async () => {
  const allJobs = screen.getByRole("list");

  expect(allJobs).toBeInTheDocument();
  expect(allJobs.childNodes.length).toBe(1);
});

test("Cuando se busque un trabajo que no exista, debe mostrarse un mensaje diciendo que no se encontraron resultados", async () => {
  const user = userEvent.setup();

  const input = screen.getByRole("textbox", {
    name: "Buscar trabajos",
  });

  await user.type(input, "asdasdasdasd");

  expect(
    screen.getByText(/No hay trabajos relacionados con tu búsqueda/)
  ).toBeInTheDocument();
});
