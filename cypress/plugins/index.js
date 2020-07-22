// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const loadConfig = require('crds-cypress-config');
const { addContentfulTasks } = require('./contentfulTasks');
const { manageBlacklist } = require('./blacklistHosts');

module.exports = (on, config) => {
  return loadConfig.loadConfigFromVault(config)
  .then((newConfig) => {
    addContentfulTasks(on, newConfig);

    manageBlacklist(newConfig);

    return newConfig;
  });
};

// Typescript
//TODO clean up structures //TODO optimize 
//TODO add linter