import { ResponseWrapper } from '../support/ResponseWrapper';

/*
* Note: Due to Cypress's async nature, methods requesting data from Contentful may return before the properties within the cy.request blocks have been assigned.
* Therefore, it is recommended that these methods are called in a before/beforeEach clause to allow more time for data retrieval.
*/
export class ContentfulApi {
  static getEntryCollection(query, failTestOnErrorCode=true) {
    const responseWrapper = new ResponseWrapper();
    cy.request({
      method: 'GET',
      url: `https://cdn.contentful.com/spaces/${Cypress.env('CONTENTFUL_SPACE_ID')}/environments/${Cypress.env('CONTENTFUL_ENV')}/entries?access_token=${Cypress.env('CONTENTFUL_ACCESS_TOKEN')}&${query}`,
      failOnStatusCode: failTestOnErrorCode
    })
      .then((response) => {
        const jsonResponse = JSON.parse(response.body);
        responseWrapper.responseBody = jsonResponse;
      });
    return responseWrapper;
  }

  static getSingleEntry(id, failTestOnErrorCode=true) {
    const responseWrapper = new ResponseWrapper();
    cy.request({
      method: 'GET',
      url: `https://cdn.contentful.com/spaces/${Cypress.env('CONTENTFUL_SPACE_ID')}/environments/${Cypress.env('CONTENTFUL_ENV')}/entries/${id}?access_token=${Cypress.env('CONTENTFUL_ACCESS_TOKEN')}`,
      failOnStatusCode: failTestOnErrorCode
    })
      .then((response) => {
        const jsonResponse = JSON.parse(response.body);
        responseWrapper.responseBody = jsonResponse;
      });
    return responseWrapper;
  }

  static getSingleAsset(id, failTestOnErrorCode=true) {
    const responseWrapper = new ResponseWrapper();
    cy.request({
      method: 'GET',
      url: `https://cdn.contentful.com/spaces/${Cypress.env('CONTENTFUL_SPACE_ID')}/environments/${Cypress.env('CONTENTFUL_ENV')}/assets/${id}?access_token=${Cypress.env('CONTENTFUL_ACCESS_TOKEN')}`,
      failOnStatusCode: failTestOnErrorCode
    })
      .then((response) => {
        const jsonResponse = JSON.parse(response.body);
        responseWrapper.responseBody = jsonResponse;
      });
    return responseWrapper;
  }
}