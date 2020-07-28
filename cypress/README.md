# Cypress
## Environment setup

Environment variables needed to run locally:
```bash
VAULT_ROLE_ID
VAULT_SECRET_ID
```


Environment variables set in Netlify to run Cypress through Travis.ci:
```bash
CYPRESS_CONFIG_FILE #which config file to use. ex. int_crossroads.json
RUN_CYPRESS #true/false
TRAVIS_CI #Travis's API Authentication token
CYPRESS_INSTALL_BINARY = 0
```

Environment variables needed by Travis.ci:
```bash
cypressDashboard
VAULT_ROLE_ID
VAULT_SECRET_ID
```

## Run Locally

After defining local environment variables, run the Cypress UI with:

```sh
npx cypress open --config-file ./cypress/config/int_crossroads.json
```

or headless with:

```sh
npx cypress run --config-file ./cypress/config/int_crossroads.json
```