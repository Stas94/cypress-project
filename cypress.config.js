import { defineConfig } from "cypress";

export default defineConfig({
  allowCypressEnv: false,

  retries: {
    runMode: 1,
    openMode: 0,
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://qauto.forstudy.space/',
    specPattern: 'cypress/e2e/**/*.cy.js',
  },
});
