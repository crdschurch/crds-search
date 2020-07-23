const algoliaSearch = require('algoliasearch');

const client = algoliaSearch(Cypress.env('ALGOLIA_APP_ID'), Cypress.env('ALGOLIA_API_KEY'));
const index = client.initIndex(Cypress.env('ALGOLIA_INDEX'));

interface AlgoliaSearchParameters {
  query?: string;
  offset?: number;
  length?: number;
  facetFilters?: Array<any>;
}

interface AlgoliaResponse {
  hits: any;
  nbHits: number;
  hitsPerPage: number;
}

export function searchAlgolia(keyword: string, ignoreHitsPerPage: boolean = false) {
  const queryObject: AlgoliaSearchParameters = { query: keyword };
  if (ignoreHitsPerPage === true) {
    queryObject.offset = 0;
    queryObject.length = 1000;
  }

  return cy.wrap<AlgoliaResponse>(index.search(queryObject));
}

export function searchAlgoliaByContentType(contentType: string) {
  const queryObject: AlgoliaSearchParameters = { facetFilters: [`contentType:${contentType}`] };

  return cy.wrap<AlgoliaResponse>(index.search(queryObject));
}
