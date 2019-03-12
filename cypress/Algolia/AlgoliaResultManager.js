import { AlgoliaApi } from './AlgoliaApi';

export class AlgoliaResultManager {
  constructor(){
    this._results_ready = false;
  }

  searchForKeyword(keyword){
    this._results_ready = false;
    const response = AlgoliaApi.getQueryResponse(keyword);
    cy.wrap({response}).its('response.responseReady').should('be.true').then(() =>{
      this._hit_list = response.responseBody.results[0].hits;
      expect(this._hit_list.length).to.be.greaterThan(0);
      this._results_ready = true;
    })
  }

  get areResultsReady(){
    return this._results_ready;
  }

  get resultList(){
    return this._hit_list;
  }
}