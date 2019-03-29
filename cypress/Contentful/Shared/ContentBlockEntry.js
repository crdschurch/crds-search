import { FormattedTextField, PlainTextField } from "./contentfulFields";

//TODO this needs to be added to CCT
export class ContentBlockEntry {
  constructor (entryObject) {
    const fields = entryObject.fields;

    this._title = new PlainTextField(fields.title, true);

    this._content = new FormattedTextField(fields.content);
  }

  get title() {
    return this._title;
  }

  get content() {
    return this._content;
  }
}