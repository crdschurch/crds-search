//TODO these are duplicates of content in crds-cypress-tools - remove later
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

// possible link states:
// has id, missing id
// published, unpublished



class ContentfulLinkField extends ContentfulField {
  constructor (linkObject, isRequired = false) {
    super(linkObject, isRequired);
  }

  get resource() {
    return this._resource_object;
  }

  get isResourceFetched() {
    return this._resource_ready;
  }
}


/**
 * This is a link to a podcast entry that must be fetched before the resource is available.
 */
export class PodcastLinkField extends ContentfulLinkField {
  constructor (linkObject, isRequired = false) {
    super(linkObject, isRequired);
  }

  /**
   * Fetches the image asset from Contentful and makes it accessible through the "resource" getter.
   * Once fetched, the resource will be an ImageAsset (if it exists) or undefined.
   *
   * @example
   * var imageLink = new PodcastLinkField(imageId);
   * imageLink.fetchResource();
   * cy.wrap({imageLink}).its('imageLink.isResourceFetched').should('be.true').then(() => {
   *  if(imageLink.resource !== undefined) {
   *    var imageAsset = imageLink.resource;
   *  }
   * });
   */
  fetchResource() {
    if (!this.hasValue) {
      this._resource_ready = true;
      return;
    }

    const id = this._value.sys.id;
    const response = ContentfulAPI.getSingleResponse(id, 'entries', false);
    cy.wrap({ response }).its('response.responseReady').should('be.true').then(() => {

      if (response.responseBody.sys.type != 'Error') {
        this._resource_object = new PodcastLinkField(response.responseBody, true);
      }
      else {
        this._resource_object = new PodcastLinkField({}, false);
      }
      this._resource_ready = true;
    });
  }
}