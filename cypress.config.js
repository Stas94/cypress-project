import { defineConfig } from "cypress";

const path = require("path");
const fs = require("fs");

const getConfig = (env) => {
  const configPath = path.resolve(
    process.cwd(),
    `cypress/fixtures/config/config.${env}.json`,
  );
  return JSON.parse(fs.readFileSync(configPath, "utf-8"));
};

export default defineConfig({
  allowCypressEnv: false,

  retries: {
    runMode: 1,
    openMode: 0,
  },
  reporter: "cypress-mochawesome-reporter",

  e2e: {
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      // implement node event listeners here
      const configValue = getConfig(process.env.TEST_ENV || "dev");
      config.env = { ...config.env, ...configValue.env };
      config = { ...config, ...configValue };
      // return require("@testomatio/reporter/cypress")(on, config); // this is handling of Testomat, breaks config loading from JSON
      return config;
    },
    baseUrl: "https://qauto.forstudy.space/",
    specPattern: "cypress/e2e/**/*.cy.js",
  },
});
