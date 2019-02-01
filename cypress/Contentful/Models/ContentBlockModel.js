import { TextField } from '../Fields/TextField';
import { assertPlatform } from '@angular/core';

export class ContentBlockManager1 {
  getContentBlockByTitle(title){
    const collectionResponse = ContentfulApi.getEntryCollection('content_type=content_block&select=sys.id,fields.title&limit=1000');
    //wait until response is ready syncronously
    //find collectionResponse id that matches the title
    const blockId = '123';
    assert.exists(blockId, `Content block with title '${title}' was not found.`);

    const blockResponse = ContentfulApi.getSingleEntry(blockId,'select=fields.title,fields.content');
    //create content block entry with blockResponse result and return
  }
}

export class ContentBlockManager {
  storeContentBlockItems(response){
    this._raw_content_block_list = response.items;
    this._list_ready = true;
  }

  getContentBlockByTitle(name) {
    cy.log(`first in list ${this._raw_content_block_list[0].fields.title}`);
    this._raw_content_block_list.forEach(block =>
      cy.log(`block title ${block.fields.title} and matches ${block.fields.title === name}`)
    )
    const index = 0;
    //const index = this._raw_content_block_list.findIndex(block => block.fields.title === name);
    //if index not found, fail test
    return new ContentBlockModel(this._raw_content_block_list[index].fields);
  }

  get contentBlocksReady(){
    return this._list_ready;
  }
}

export class ContentBlockModel {
  constructor(responseItem){
    this._content = new TextField(responseItem.content);
    this._content.required = true;
  }

  get content(){
    return this._content;
  }
}