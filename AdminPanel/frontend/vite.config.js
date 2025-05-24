// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://brand-driver-server.onrender.com/api",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
