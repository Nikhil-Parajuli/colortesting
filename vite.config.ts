import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: true,
    hmr: {
      timeout: 0
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: true
  }
});