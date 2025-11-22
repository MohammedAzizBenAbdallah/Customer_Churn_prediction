import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // <-- 1. Listen on all addresses (0.0.0.0)
    watch: {
      usePolling: true, // <-- 2. Fixes hot reload on Windows/Docker
    },
  },
});
