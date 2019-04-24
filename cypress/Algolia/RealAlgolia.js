import { ResponseWrapper } from "./ResponseWrapper";
import algoliasearch from "algoliasearch";

//

export class RealAlgolia {
  //TODO need to convert existing tests to use this
  static fetchResultsForKeyword(keyword) {
    const responseWrapper = new ResponseWrapper();
    const client = algoliasearch(Cypress.env('ALGOLIA_APP_ID'), Cypress.env('ALGOLIA_API_KEY'));
    const index = client.initIndex(Cypress.env('ALGOLIA_INDEX'));
    index.search({ query: keyword }).then(rsp => {
      responseWrapper.responseBody = rsp;
    });
    return responseWrapper;
  }

  static fetchResultsByContentType(contentType) {
    const responseWrapper = new ResponseWrapper();

    const client = algoliasearch(Cypress.env('ALGOLIA_APP_ID'), Cypress.env('ALGOLIA_API_KEY'));
    const index = client.initIndex(Cypress.env('ALGOLIA_INDEX'));
    index.search({ facetFilters: [`contentType:${contentType}`] }).then(rsp => {
      responseWrapper.responseBody = rsp;
    });
    return responseWrapper;
  }
}