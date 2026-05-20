import { defineConfig } from "vite";
import { resolve } from "path";
import { fileURLToPath } from "url"; // ← 추가

const __dirname = fileURLToPath(new URL(".", import.meta.url)); // ← 추가

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "about/index.html"),
        workHence: resolve(__dirname, "works/hence.html"),
        workVortex: resolve(__dirname, "works/vortex.html"),
        workLglife: resolve(__dirname, "works/lglife.html"),
        workDreamplus: resolve(__dirname, "works/dreamplus.html"),
        workSamsung: resolve(__dirname, "works/samsung.html"),
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
