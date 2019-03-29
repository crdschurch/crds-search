import { PlainTextField, FormattedTextField, ImageLinkField } from './contentfulFields';
//this is already in CCT - do not duplicate
export class MessageEntry {
  constructor (entryObject, seriesEntry) {
    this._series = seriesEntry;
    const fields = entryObject.fields;

    this._title = new PlainTextField(fields.title, true);
    this._slug = new PlainTextField(fields.slug, true);
    this._image_link = new ImageLinkField(fields.image, true);
    this._description = new FormattedTextField(fields.description);
  }

  //This must be called before a linked resource can be accessed
  fetchLinkedResources() {
    this._image_link.fetchResource();
    return cy.wrap(this._image_link).its('isResourceFetched').should('be.true');
  }

  get title() {
    return this._title;
  }

  get slug() {
    return this._slug;
  }

  get description() {
    return this._description;
  }

  get URL() {
    const seriesComponent = this.series === undefined ? '' : `${this.series.slug.text}/`;
    const relativeUrl = `/series/${seriesComponent}${this.slug.text}`;
    return {
      relative: relativeUrl,
      absolute: `${Cypress.env('CRDS_MEDIA_ENDPOINT')}${relativeUrl}`
    };
  }

  get series() {
    return this._series;
  }

  /* Linked resources */
  //Returns undefined or an ImageAsset
  get image() {
    return this._image_link.resource;
  }
}