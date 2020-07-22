import algoliasearch from 'algoliasearch';

const client = algoliasearch(Cypress.env('ALGOLIA_APP_ID'), Cypress.env('ALGOLIA_API_KEY'));
const index = client.initIndex(Cypress.env('ALGOLIA_INDEX'));

export function searchAlgolia(keyword, ignoreHitsPerPage = false) {
  const queryObject = { query: keyword };
  if (ignoreHitsPerPage == true) {
    queryObject.offset = 0;
    queryObject.length = 1000;
  }

  return cy.wrap(index.search(queryObject));
}

export function searchAlgoliaByContentType(contentType) {
  const queryObject = { facetFilters: [`contentType:${contentType}`] };

  return cy.wrap(index.search(queryObject));
}
