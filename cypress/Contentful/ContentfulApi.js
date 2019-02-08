/*
* Note: Due to Cypress's async nature, methods requesting data from Contentful may return before the properties within the cy.request blocks have been assigned.
* Therefore, it is recommended that these methods are called in a before/beforeEach clause to allow more time for data retrieval.
*/
class ResponseWrapper {
  constructor () {
    this._response_ready = false;
  }

  get responseReady() {
    return this._response_ready;
  }

  set responseBody(response) {
    this._response_body = response;
    this._response_ready = true;
  }

  get responseBody() {
    return this._response_body;
  }
}

export class ContentfulApi {
  static getEntryCollection(query) {
    const responseWrapper = new ResponseWrapper();
    cy.request('GET', `https://cdn.contentful.com/spaces/${Cypress.env('CONTENTFUL_SPACE_ID')}/environments/${Cypress.env('CONTENTFUL_ENV')}/entries?access_token=${Cypress.env('CONTENTFUL_ACCESS_TOKEN')}&${query}`)
      .then((response) => {
        const jsonResponse = JSON.parse(response.body);
        responseWrapper.responseBody = jsonResponse;
      });
    return responseWrapper;
  }

  static getSingleEntry(id, query) {
    const responseWrapper = new ResponseWrapper();
    cy.request('GET', `https://cdn.contentful.com/spaces/${Cypress.env('CONTENTFUL_SPACE_ID')}/environments/${Cypress.env('CONTENTFUL_ENV')}/entries/${id}?access_token=${Cypress.env('CONTENTFUL_ACCESS_TOKEN')}&${query}`)
      .then((response) => {
        const jsonResponse = JSON.parse(response.body);
        responseWrapper.responseBody = jsonResponse;
      });
    return responseWrapper;
  }
}