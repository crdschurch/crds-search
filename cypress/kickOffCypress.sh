#!/usr/bin/env bash
shopt -s nocasematch; #ignore case

#Skip all testing against preview branches
if [ "$CONTEXT" != "production" ];
then
    exit 0
fi

body="{\"request\": { \"branch\":\"$HEAD\", \"config\": {\"env\": { \"RUN_CYPRESS\": \"$RUN_CYPRESS\", \"configFile\": \"$CYPRESS_CONFIG_FILE\", \"contentfulSpaceId\": \"$CONTENTFUL_SPACE_ID\", \"contentfulToken\": \"$CONTENTFUL_ACCESS_TOKEN\", \"algoliaAppId\": \"$ALGOLIA_APP_ID\", \"algoliaApiKey\": \"$ALGOLIA_API_KEY\", \"DEBUG_NetlifyContext\": \"$CONTEXT\"}}}}"

curl -s -X POST \
-H "Content-Type: application/json" \
-H "Accept: application/json" \
-H "Travis-API-Version: 3" \
-H "Authorization: token $TRAVIS_CI" \
-d "$body" \
https://api.travis-ci.com/repo/crdschurch%2Fcrds-search/requests
