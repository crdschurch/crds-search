# Cypress
## Environment setup

Environment variables needed to run locally:
```sh
CYPRESS_CONTENTFUL_ACCESS_TOKEN
CYPRESS_CONTENTFUL_SPACE_ID
CYPRESS_ALGOLIA_APP_ID
CYPRESS_ALGOLIA_API_KEY
```


Environment variables set in Netlify to run Cypress through Travis.ci:
```sh
CYPRESS_CONFIG_FILE #which config file to use. ex. int_crossroads
ALGOLIA_APP_ID
ALGOLIA_API_KEY
CONTENTFUL_ACCESS_TOKEN
CONTENTFUL_SPACE_ID
RUN_CYPRESS #true/false
TRAVIS_CI #Travis's API Authentication token
CYPRESS_INSTALL_BINARY = 0
```

## Run Locally

After defining local environment variables, run the Cypress UI with:

```sh
yarn run cypress open
```

or headless with:

```sh
yarn run cypress run
```

The default config file used is int_crossroads. To load a different config, use the --env configFile=[...] flag.
```sh
yarn run cypress open --env configFile=demo_crossroads
yarn run cypress run --env configFile=demo_crossroads
```