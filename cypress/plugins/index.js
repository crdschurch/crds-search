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

function loadConfigFile(config){
  const fs = require('fs-extra');
  const path = require('path');

  // Load test config files
  const filename = config.env.configFile || 'int_crossroads';
  const configPath = path.resolve('cypress', 'config', filename + '.json');
  return fs.readJSON(configPath).then(newConfig => {
    console.log('Loading config file ' + filename + ' with baseUrl ' + newConfig.baseUrl);
    return newConfig;
  });
}

module.exports = (on, config) => {
  return loadConfigFile(config);
};