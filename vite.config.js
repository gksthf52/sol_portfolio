import { defineConfig } from "vite";

export default defineConfig({
  root: ".",
  build: {
    outDir: "dist",
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use './src/styles/_variables.scss' as *;`,
      },
    },
  },
});
