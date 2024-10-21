// vite.config.js
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1000, // Adjust limit as necessary
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor"; // Split vendor code into its own chunk
          }
        },
      },
    },
  },
});
