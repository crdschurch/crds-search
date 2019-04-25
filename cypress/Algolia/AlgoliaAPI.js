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
    return index.search(queryObject);
  }
}