// vite.config.mjs
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import path from 'path';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../build',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: () => 'everything.js',
      },
    },
    assetsInlineLimit: Infinity,
  },
  plugins: [viteSingleFile()],
});
