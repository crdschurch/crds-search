const removeMarkdown = require('remove-markdown');
import { ContentfulLibrary } from 'crds-cypress-tools';
import { MessageEntry } from 'crds-cypress-tools/lib/contentfulLibrary/resourceStructures/messageEntry';

// import * as ContentfulAPI from '../contentfulAPI';
// import { ImageAsset } from './imageAsset';

//TODO this has been updated - need to update CCT
class ContentfulField {
  constructor (value, isRequired = false) {
    this._value = value;
    this._is_required = isRequired;
  }

  get hasValue() {
    if (this._is_required) {
      expect(this._value).to.not.be.undefined;
    }
    return this._value !== undefined;
  }
}

//These are text fields that do not have any formatting (ex. slugs, titles)
export class PlainTextField extends ContentfulField {
  constructor (value, isRequired = false) {
    super(value, isRequired);
  }

  get text() {
    return this.hasValue ? this._value : '';
  }
}

//These are longer text fields that may have markdown/HTML syntax
export class FormattedTextField extends ContentfulField {
  constructor (value, isRequired = false) {
    super(value, isRequired);
  }

  get text() {
    return this.hasValue ? this._value : '';
  }

  get displayedText() {
    return this._textToBeDisplayed();
  }

  _textToBeDisplayed() {
    if (!this.hasValue)
      return '';

    const fakeTextArea = document.createElement('textarea');
    fakeTextArea.innerHTML = removeMarkdown(this._value);
    const encodedHTML = fakeTextArea.value.replace(/\W+/g, ' ').trim();
    return encodedHTML;
  }
}

export class DateField extends ContentfulField {
  constructor (value, isRequired = false) {
    super(value, isRequired);
  }

  get date() {
    return this.hasValue ? this._value.split('T')[0] : undefined;
  }

  get time() {
    return this.hasValue ? this._value.split('T')[1] : undefined;
  }
}

//These are links to image assets - fetching this asset will return an ImageAsset if it exists
export class ImageLinkField extends ContentfulField {
  constructor (linkObject, isRequired = false) {
    super(linkObject, isRequired);
  }

  get resource() {
    return this._resource_object;
  }

  get isResourceFetched() {
    return this._resource_ready;
  }

  fetchResource() {
    if (!this.hasValue) {
      this._resource_ready = true;
      return;
    }

    const id = this._value.sys.id;
    const response = ContentfulLibrary.query.singleAsset(id, false); //TODO this needs to be converted
    cy.wrap({ response }).its('response.responseReady').should('be.true').then(() => {

      if (response.responseBody.sys.type != 'Error') {
        this._resource_object = new ImageAsset(response.responseBody, true);
      }
      else {
        this._resource_object = new ImageAsset({}, false);
      }
      this._resource_ready = true;
    });
  }
}

export class MessageLinkField extends ContentfulField {
  constructor (linkObject, isRequired = false) {
    super(linkObject, isRequired);
  }

  get resource() {
    return this._resource_object;
  }

  get isResourceFetched() {
    return this._resource_ready;
  }

  fetchResource(seriesEntry) {
    if (!this.hasValue) {
      this._resource_ready = true;
      return;
    }

    const id = this._value.sys.id;
    const response = ContentfulLibrary.query.singleEntry(id, false); //TODO need to convert
    cy.wrap({ response }).its('response.responseReady').should('be.true').then(() => {

      if (response.responseBody.sys.type != 'Error') {
        this._resource_object = new MessageEntry(response.responseBody, seriesEntry, true);
      }

      this._resource_ready = true;
    });
  }
}