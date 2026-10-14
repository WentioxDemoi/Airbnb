import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// base "./" : les chemins restent relatifs, le site marche à la racine
// (username.github.io) comme dans un sous-dossier (username.github.io/repo).
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
});
