// vite.config.mjs
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../build',
    emptyOutDir: true,
    assetsInlineLimit: Infinity,
  },
  plugins: [viteSingleFile()],
});
