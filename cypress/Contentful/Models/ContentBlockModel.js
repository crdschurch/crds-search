import { TextField } from '../Fields/TextField';
import { ContentfulApi } from '../ContentfulApi';

export class ContentBlockManager {
  saveContentBlockByTitle(title) {
    const allContentBlocks = ContentfulApi.getEntryCollection('content_type=content_block&select=sys.id,fields.title&limit=1000');
    cy.wrap({ allContentBlocks }).its('allContentBlocks.responseReady').should('be.true').then(() => {
      const blockResponse = allContentBlocks.responseBody.items.find(b => b.fields.title === title);
      expect(blockResponse).to.not.be.undefined;

      const blockEntry = ContentfulApi.getSingleEntry(blockResponse.sys.id);
      cy.wrap({ blockEntry }).its('blockEntry.responseReady').should('be.true').then(() => {
        this[title] = new ContentBlockModel(blockEntry.responseBody.fields);
      });
    });
  }
}

export class ContentBlockModel {
  constructor (responseFields) {
    this._content = new TextField(responseFields.content);
    this._content.required = true;
  }

  get content() {
    return this._content;
  }
}