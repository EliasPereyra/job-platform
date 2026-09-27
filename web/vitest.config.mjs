import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsConfigPaths()],
  test: {
    environment: "jsdom",
    include: ["{app,modules,shared}/**/*.{test,spec}.{ts,tsx}"],
    setupFiles: ["./vitest-setup.config.ts"],
  },
});
