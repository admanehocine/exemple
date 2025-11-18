// cypress.config.js
const { defineConfig } = require('cypress')
import { allureCypress } from "allure-cypress/reporter";

module.exports = defineConfig({
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'results/my-test-output.xml',
    toConsole: true,
  },
  //reporter: 'cypress-mochawesome-reporter',
  e2e: {
    video:false,
    screenshotsFolder:'cypress/screenshots',
    videosFolder: 'cypress/videos',
    setupNodeEvents(on, config) {
      const { plugin: cypressGrepPlugin } = require('@cypress/grep/plugin')
      cypressGrepPlugin(config)
      allureCypress(on, config, {
        resultsDir: "allure-results",
      });
      //require('cypress-mochawesome-reporter/plugin')(on);
      return config
    },
  },
})