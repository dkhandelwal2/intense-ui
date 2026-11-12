import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["**/*.test.{ts,tsx}", "**/__tests__/**/*.{ts,tsx}"],
    exclude: ["node_modules", "dist", ".next"],
  },
  resolve: {
    alias: {
      react: path.resolve(import.meta.dirname, "./node_modules/react"),
      "react-dom": path.resolve(import.meta.dirname, "./node_modules/react-dom"),
      "react/jsx-runtime": path.resolve(
        import.meta.dirname,
        "./node_modules/react/jsx-runtime"
      ),
      "lucide-react": path.resolve(
        import.meta.dirname,
        "./node_modules/lucide-react"
      ),
      "@": path.resolve(import.meta.dirname, "./apps/web/src"),
      "@registry": path.resolve(import.meta.dirname, "./packages/registry/src"),
      "@registry-config": path.resolve(
        import.meta.dirname,
        "./packages/registry/registry-config.json"
      ),
      "intense-ui": path.resolve(
        import.meta.dirname,
        "./packages/registry/src/index.ts"
      ),
    },
  },
});
