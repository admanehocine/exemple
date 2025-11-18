// ***********************************************************
// support/e2e.js
// ***********************************************************

// Import commands
import './commands'
import 'cypress-mochawesome-reporter/register';
import "allure-cypress";
const { register: registerCypressGrep } = require('@cypress/grep')
registerCypressGrep()
// Import cypress-grep plugin
//import 'cypress-grep'
