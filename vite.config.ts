import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: 'localhost',
    cors: {
      origin: '*', // Allow all origins (only for development)
      credentials: true
    }, // ✅ Properly closed `cors` object
    open: true,
    hmr: {
      overlay: true
    },
    watch: {
      usePolling: true
    }
  },
  preview: {
    port: 5173,
    host: true
  },
  resolve: {
    dedupe: ['@supabase/supabase-js', 'react', 'react-dom']
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
});
