import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react';
import * as dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    lib: {
      entry: './src/index.tsx', // Entry point for the library
      name: 'AmexComponentLibrary', // Name of the global variable for UMD builds
      fileName: (format) => `amex-component-library.${format}.js`, // Output file names
    },
    rollupOptions: {
      // Externalize dependencies to avoid bundling them
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
// Configuration for testing
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts', // Include optional setup file for testing utilities
  },
  // Base path for assets
  publicDir: 'public', // Directory for static asset
})
