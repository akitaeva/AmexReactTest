import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react';
import * as dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

export default defineConfig({
  base: './',
  plugins: [react()],
// Configuration for testing
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts', // Include setup file for testing utilities
  },
  // Base path for assets
  publicDir: 'public', // Directory for static asset
})
