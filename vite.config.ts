import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [react()],

  // ✅ GitHub Pages base-path (matcher repo-navn)
  base: "/camille-s-post-it-party/",

  // ✅ Så @/ peger på /src
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
