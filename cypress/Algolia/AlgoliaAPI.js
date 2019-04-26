import algoliasearch from "algoliasearch";

export class AlgoliaAPI {
  static searchByKeyword(keyword) {
    return AlgoliaAPI.search({query: keyword});
  }

  static searchByContentType(contentType) {
    return AlgoliaAPI.search({ facetFilters: [`contentType:${contentType}`] });
  }

  static search(queryObject) {
    const client = algoliasearch(Cypress.env('ALGOLIA_APP_ID'), Cypress.env('ALGOLIA_API_KEY'));
    const index = client.initIndex(Cypress.env('ALGOLIA_INDEX'));

    const responseWrapper = {}
    index.search(queryObject).then(response => {
      responseWrapper.response = response;
    })

    //Warning: Cypress does not scope external Promises to their tests correctly.
    //Responses must be converted into a Cypress 'promise like' object or tests will behave unexpectedly.
    return cy.wrap({responseWrapper}).its('responseWrapper.response').should('not.be.undefined').then(() => responseWrapper.response )
  }
}