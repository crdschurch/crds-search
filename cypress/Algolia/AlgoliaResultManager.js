import { AlgoliaApi } from './AlgoliaApi';

export class AlgoliaResultManager {
  constructor(){
    this._results_ready = false;
  }

  searchForKeyword(keyword){
    cy.log(`AlgoliaResultManager searching for keyword _${keyword}_`);
    this._results_ready = false;
    const response = AlgoliaApi.getQueryResponse(keyword);
    cy.wrap({response}).its('response.responseReady').should('be.true').then(() =>{
      this._hit_list = response.responseBody.results[0].hits;
      this._results_ready = true;
    })
  }

  getResultByUrl(url){
    cy.log(`looking for results by url ${url}`)
    return this._hit_list.find(r => {
      cy.log(`looking at hit with url ${r.url}`);
      return r.url === url;
    });
  }

  get areResultsReady(){
    return this._results_ready;
  }
}