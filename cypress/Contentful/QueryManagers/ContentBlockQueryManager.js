import { ContentfulLibrary } from 'crds-cypress-tools';

export class ContentBlockQueryManager {
  fetchContentBlockByTitle(title) {
    this._query_result = undefined;
    const contentBlockList = ContentfulLibrary.query.entryList(`${this._requiredQueryParameters}&fields.title=${title}&limit=1`);
    return cy.wrap({ contentBlockList }).its('contentBlockList.responseReady').should('be.true').then(() => {
      const contentBlock = contentBlockList.responseBody.items[0];
      if(contentBlock !== undefined)
        this._query_result = new ContentfulLibrary.entry.contentBlock(contentBlock);
    });
  }

  get queryResult() {
    return this._query_result;
  }

  get _requiredQueryParameters() {
    return `content_type=content_block`;
  }
}
