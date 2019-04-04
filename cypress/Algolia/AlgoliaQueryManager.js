import { AlgoliaApi } from './AlgoliaApi';

export class AlgoliaQueryManager {
  fetchResultsForKeyword(keyword){
    this._query_result = [];
    const response = AlgoliaApi.getQueryResponse(keyword);
    return cy.wrap({response}).its('response.responseReady').should('be.true').then(() =>{
      this._query_result = response.responseBody.results[0].hits;
    })
  }

  get queryResult() {
    return this._query_result;
  }
}
