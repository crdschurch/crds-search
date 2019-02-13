# Cypress
## Environment setup

Environment variables needed to run locally:
```sh
CYPRESS_CONTENTFUL_ACCESS_TOKEN
CYPRESS_CONTENTFUL_SPACE_ID
CYPRESS_CONTENTFUL_ENV
```


Environment variables set in Netlify to run Cypress through Travis.ci:
```sh
CONTENTFUL_ACCESS_TOKEN
CONTENTFUL_SPACE_ID
CONTENTFUL_ENV
RUN_CYPRESS #true/false
TRAVIS_CI #Travis's API Authentication token
CYPRESS_INSTALL_BINARY = 0
SITE_URL #https://int.crossroads.net/search
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