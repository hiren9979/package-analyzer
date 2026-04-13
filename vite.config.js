import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const isDev = command === 'serve';
  
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 3000,
      open: true,
      watch: {
        ignored: [
          '**/node_modules/**',
          '**/.git/**',
          '**/dist/**',
          '**/coverage/**',
        ],
      },
    },
    build: {
      outDir: 'build',
      sourcemap: isDev,
    },
    define: {
      // Handle any global variables if needed
    },
  };
});
