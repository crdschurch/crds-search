import { ResponseWrapper } from './ResponseWrapper'

export class AlgoliaApi {
  static getQueryResponse(keyword) {
    const responseWrapper = new ResponseWrapper();
    const encodedKeyword = encodeURI(keyword);
    cy.request({
      method: 'POST',
      url: `https://${Cypress.env('ALGOLIA_APP_ID')}-dsn.algolia.net/1/indexes/*/queries?x-algolia-application-id=${Cypress.env('ALGOLIA_APP_ID')}&x-algolia-api-key=${Cypress.env('ALGOLIA_API_KEY')}`,
      body: { "requests": [{ "indexName": Cypress.env('ALGOLIA_INDEX'), "params": `query=${encodedKeyword}` }] }
    }).then(response => {
      responseWrapper.responseBody = response.body;
    });
    return responseWrapper;
  }
}