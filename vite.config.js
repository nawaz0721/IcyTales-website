import { defineConfig } from "vite";
import path from "path"; // Needed to resolve file paths

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
  resolve: {
    alias: {
      // Alias '@context' to your context folder
      '@context': path.resolve(__dirname, 'src/context'),
    },
  },
});
