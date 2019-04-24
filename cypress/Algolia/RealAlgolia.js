import { ResponseWrapper } from "./ResponseWrapper";
import algoliasearch from "algoliasearch";

//

export class RealAlgolia {
  static getQueryResponse(keyword) {
    const responseWrapper = new ResponseWrapper();
    // const encodedKeyword = encodeURI(keyword);
    const client = algoliasearch(Cypress.env('ALGOLIA_APP_ID'), Cypress.env('ALGOLIA_API_KEY'));
    const index = client.initIndex(Cypress.env('ALGOLIA_INDEX'));
    index.search({ query: keyword }).then(rsp => {
      responseWrapper.responseBody = rsp;
    });

    // cy.request({
    //   method: 'POST',
    //   url: `https://${Cypress.env('ALGOLIA_APP_ID')}-dsn.algolia.net/1/indexes/*/queries?x-algolia-application-id=${Cypress.env('ALGOLIA_APP_ID')}&x-algolia-api-key=${Cypress.env('ALGOLIA_API_KEY')}`,
    //   body: { "requests": [{ "indexName": Cypress.env('ALGOLIA_INDEX'), "params": `query=${encodedKeyword}` }] }
    // }).then(response => {
    //   responseWrapper.responseBody = response.body;
    // });
    return responseWrapper;
  }
}