import { ContentBlockManager } from './Models/ContentBlockModel';

/*
* Note: Due to Cypress's async nature, methods requesting data from Contentful may return before the properties within the cy.request blocks have been assigned.
* Therefore, it is recommended that these methods are called in a before/beforeEach clause to allow more time for data retrieval.
*/
export class ContentfulApi {
  retrieveContentBlockManager() {
    const contentBlockManager = new ContentBlockManager();
    cy.request('GET', `https://cdn.contentful.com/spaces/${Cypress.env('CONTENTFUL_SPACE_ID')}/environments/${Cypress.env('CONTENTFUL_ENV')}/entries?access_token=${Cypress.env('CONTENTFUL_ACCESS_TOKEN')}&content_type=content_block`)
      .then((response) => {
        const jsonResponse = JSON.parse(response.body);
        contentBlockManager.storeContentBlockItems(jsonResponse);
      });
    return contentBlockManager;
  }
}
