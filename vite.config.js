// vite.config.js
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor"; // Split vendor code into its own chunk
          }
          // You can add more conditions here based on your project structure
        },
      },
    },
  },
});
