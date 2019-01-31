import { TextField } from '../Fields/TextField';

export class ContentBlockManager {
  storeContentBlockItems(response){
    this._raw_content_block_list = response.items;
    this._list_ready = true;
  }

  getContentBlockByTitle(name) {
    const index = this._raw_content_block_list.findIndex(block => block.fields.title === name);
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