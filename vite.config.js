import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom")) {
              return "react-vendor";
            }
            if (id.includes("lodash")) {
              return "lodash";
            }
            return "vendor";
          }
          if (id.includes("src/pages")) {
            return "pages";
          }
          if (id.includes("src/components")) {
            return "components";
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  // Add resolve options for module resolution
  resolve: {
    alias: {
      '@context': '/src/context', // Optional: Set up a path alias for easier imports
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // Ensure Vite resolves .jsx files automatically
  },
});
