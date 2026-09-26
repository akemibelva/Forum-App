import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173', // Sesuaikan dengan port local dev server (Vite/React)
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    supportFile: false,
  },
});