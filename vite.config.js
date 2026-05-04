import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "about/index.html"),
        work: resolve(__dirname, "work/index.html"),
      },
    },
    outDir: "dist",
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/styles/common" as *;
        `,
      },
    },
  },

  server: {
    host: true,
    port: 5173,
  },
});
