export default {
  build: {
    chunkSizeWarningLimit: 1000, // Adjusts the warning threshold for chunk sizes
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "lodash"], // Separates these libraries into their own chunk
        },
      },
    },
  },
};
