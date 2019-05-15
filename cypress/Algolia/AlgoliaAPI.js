import algoliasearch from "algoliasearch";

export class AlgoliaAPI {
  /**
   * Queries Algolia for a keyword
   * @param {string} keyword
   * @param {boolean} ignoreHitsPerPage - If true, returns up to the first 1000 hits, else returns up to the configured hitsPerPage limit
   * @returns Cypress promise containing the response
   */
  static searchByKeyword(keyword, ignoreHitsPerPage=false) {
    const queryObject = {query: keyword};
    if(ignoreHitsPerPage == true){
      queryObject.offset = 0;
      queryObject.length = 1000;
    }
    return AlgoliaAPI.search(queryObject);
  }

  /**
   * Queries Algolia for results by content type
   * @param {string} contentType
   * @returns Cypress promise containing the response
   */
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