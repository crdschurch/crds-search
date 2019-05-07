import { PlainTextField, EntryLinkField } from "../Search_contentfulFields";

/**
 * episodes require podcasts AND KNPW THEM
 *
 */

export class EpisodeEntry {
  constructor(entryObject) {
    this._podcast = podcastEntry;
    const fields = entryObject.fields;

    this._title = new PlainTextField(fields.title, true);
    this._slug = new PlainTextField(fields.slug, true);
    this._podcast = new EntryLinkField(fields.podcast, true);
  }

  get title() {
    return this._title;
  }

  get slug() {
    return this._slug;
  }

  get URL() {
    expect(this.podcast).to.not.be.undefined; //Podcasts are required
    const relativeURL = `/podcasts/${this.podcast.slug.text}/${this.slug.text}`;
    return {
      relative: relativeURL,
      absolute: `${Cypress.env('CRDS_MEDIA_ENDPOINT')}${relativeURL}`
    };
  }

  get podcast() {
    return this._podcast;
  }
}