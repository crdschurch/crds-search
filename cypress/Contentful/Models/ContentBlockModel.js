import { TextField } from '../Fields/TextField';
import { ContentfulApi } from '../ContentfulApi';

export class ContentBlockManager {
  saveContentBlockByTitle(title) {
    const allContentBlocks = ContentfulApi.getEntryCollection('content_type=content_block&select=sys.id,fields.title&limit=1000');
    cy.wrap({ allContentBlocks }).its('allContentBlocks.responseReady').should('be.true').then(() => {
      let response_list = allContentBlocks.responseBody.items;

      const index = response_list.findIndex(block => block.fields.title === title);
      assert.isAbove(index, -1, `Index for content block with title '${title}' was found`)
      const entryId = response_list[index].sys.id;

      const blockResponse = ContentfulApi.getSingleEntry(entryId, 'select=fields.title,fields.content');
      cy.wrap({ blockResponse }).its('blockResponse.responseReady').should('be.true').then(() => {
        this[title] = new ContentBlockModel(blockResponse.responseBody.fields);
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