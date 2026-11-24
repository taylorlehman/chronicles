import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env.VITE_BASE || '/',
  server: {
    port: 5173,
    open: false,
  },
  build: {
    target: 'es2022',
    sourcemap: true,
  },
});
