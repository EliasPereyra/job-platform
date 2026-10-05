import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { FavoriteButton } from "./favorite-button";
import { FavoritesProvider } from "../context/favorites-context";

const { session, getFavoriteJobIds, setJobFavorite, toast } = vi.hoisted(() => ({
  session: { current: null as { user: { id: string } } | null },
  getFavoriteJobIds: vi.fn(),
  setJobFavorite: vi.fn(),
  toast: Object.assign(vi.fn(), { success: vi.fn(), error: vi.fn() }),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => "/todos-los-trabajos/",
}));
vi.mock("@/modules/auth/auth-client", () => ({
  authClient: { useSession: () => ({ data: session.current, isPending: false }) },
}));
vi.mock("../actions", () => ({ getFavoriteJobIds, setJobFavorite }));
vi.mock("sonner", () => ({ toast }));

const job = { _id: "job-1", title: "Repositor/a de góndola" };

const renderButton = () =>
  render(
    <FavoritesProvider>
      <FavoriteButton job={job} />
    </FavoritesProvider>,
  );

beforeEach(() => {
  session.current = { user: { id: "user-1" } };
  getFavoriteJobIds.mockResolvedValue([]);
  setJobFavorite.mockResolvedValue({ ok: true });
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

test("Muestra como guardados los empleos que el usuario ya tiene en favoritos", async () => {
  getFavoriteJobIds.mockResolvedValue(["job-1"]);
  renderButton();

  await waitFor(() =>
    expect(screen.getByRole("button", { name: "Guardado en favoritos" })).toHaveAttribute(
      "aria-pressed",
      "true",
    ),
  );
});

test("Guardar un empleo lo marca en el botón y avisa con una notificación", async () => {
  const user = userEvent.setup();
  renderButton();
  await waitFor(() => expect(getFavoriteJobIds).toHaveBeenCalled());

  await user.click(screen.getByRole("button", { name: "Guardar en favoritos" }));

  expect(screen.getByRole("button", { name: "Guardado en favoritos" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  expect(setJobFavorite).toHaveBeenCalledWith("job-1", true);
  await waitFor(() =>
    expect(toast.success).toHaveBeenCalledWith(
      "Empleo guardado en favoritos",
      expect.objectContaining({ description: job.title }),
    ),
  );
});

test("Si no se pudo guardar, el botón vuelve a su estado y se muestra un error", async () => {
  const user = userEvent.setup();
  setJobFavorite.mockResolvedValue({ ok: false, reason: "error" });
  renderButton();
  await waitFor(() => expect(getFavoriteJobIds).toHaveBeenCalled());

  await user.click(screen.getByRole("button", { name: "Guardar en favoritos" }));

  await waitFor(() => expect(toast.error).toHaveBeenCalled());
  expect(screen.getByRole("button", { name: "Guardar en favoritos" })).toHaveAttribute(
    "aria-pressed",
    "false",
  );
});

test("Sin sesión, invita a ingresar en lugar de guardar", async () => {
  const user = userEvent.setup();
  session.current = null;
  renderButton();

  await user.click(screen.getByRole("button", { name: "Guardar en favoritos" }));

  expect(setJobFavorite).not.toHaveBeenCalled();
  expect(toast).toHaveBeenCalledWith("Ingresá para guardar empleos", expect.anything());
});
