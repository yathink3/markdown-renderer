import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: "./src/index.ts",
      name: "MarkdownRenderer",
      formats: ["es", "umd"],
      fileName: (format) => `index.${format}.js`,
    },
  },
  plugins: [react(), tailwindcss()],
});
