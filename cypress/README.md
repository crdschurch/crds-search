TODO add this stuff to the crds-net repo too
To run cypress locally:
yarn run cypress open

Environment variables needed to run locally:
CYPRESS_CONTENTFUL_ACCESS_TOKEN
CYPRESS_CONTENTFUL_SPACE_ID
CYPRESS_CONTENTFUL_ENV = "int"


Environment variables Netlify needs to run on Travis.ci:
CONTENTFUL_ACCESS_TOKEN
CONTENTFUL_SPACE_ID
CONTENTFUL_ENV
RUN_CYPRESS #true/false
TRAVIS_CI #Travis's API Authentication token
CYPRESS_INSTALL_BINARY = 0 #installing the binary should not be done - it's slow and isn't needed
