import { PlainTextField, FormattedTextField, ImageLinkField, DateField, MessageLinkField } from './contentfulFields';
import { ImageAsset } from './imageAsset';
import { ContentfulLibrary } from 'crds-cypress-tools';
import { MessageEntry } from 'crds-cypress-tools/lib/contentfulLibrary/resourceStructures/messageEntry';
//TODO this has been updated - need to update CCT
export class SeriesEntry {
  constructor (entryObject) {
    const fields = entryObject.fields;

    this._title = new PlainTextField(fields.title, true);
    this._slug = new PlainTextField(fields.slug, true);
    this._description = new FormattedTextField(fields.description);

    this._image_link = new ImageLinkField(fields.image);
    this._background_image_link = new ImageLinkField(fields.background_image);

    this._starts_at = new DateField(fields.starts_at);
    this._ends_at = new DateField(fields.ends_at);
    this._youtube_url = new PlainTextField(fields.youtube_url);

    //Save each message id
    this._message_ids = [];
    if (fields.videos !== undefined) {
      fields.videos.forEach(m => this._message_ids.push(m.sys.id))
    }

    //when fetching, add to this._messages only if message_link.resource is not undefined after
    // this._message_links = [];
    // if (fields.videos !== undefined) {
    //   fields.videos.forEach(v => this._message_links.push(new MessageLinkField(v)));
    // }
  }

  //This must be called before a linked resource can be accessed
  fetchLinkedResources() {
    this._image_link.fetchResource(ImageAsset);
    this._background_image_link.fetchResource(ImageAsset);
    return cy.wrap(this._image_link).its('isResourceFetched').should('be.true').then(() => {
      return cy.wrap(this._background_image_link).its('isResourceFetched').should('be.true');
    });
  }

  fetchPublishedMessages() {
    const now = Cypress.moment(Date.now()).utc().format();
    const messageList = ContentfulLibrary.query.entryList(`content_type=message&fields.published_at[lte]=${now}&sys.id[in]=${this._message_ids.join(',')}`);

    return cy.wrap({ messageList }).its('messageList.responseReady').should('be.true').then(() => {
      const messages = messageList.responseBody.items;
      this._messages = [];
      messages.forEach(m => {
        this._messages.push(new MessageEntry(m, this));
      })
    });


    // this._message_links.forEach(ml => ml.fetchResource(this));
    // //TODO this isn't safe - can't chain
    // this._messages = [];
    // this._message_links.forEach(ml => {
    //   cy.wrap({ ml }).its('ml.isResourceFetched').should('be.true').then(() => {
    //     if (ml.resource !== undefined) {
    //       this._messages.push(ml.resource);
    //     }
    //   });
    // });
  }

  //TODO later
  // _doWhenFetched(link, callback) {
  //   cy.wrap({ link }).its('link.isResourceFetched').should('be.true').then(() => {
  //     callback(link.resource);
  //   });
  // }

  get title() {
    return this._title;
  }

  get slug() {
    return this._slug;
  }

  get URL() {
    return {
      relative: `/series/${this.slug.text}`,
      absolute: `${Cypress.env('CRDS_MEDIA_ENDPOINT')}/series/${this.slug.text}`
    };
  }

  get description() {
    return this._description;
  }

  get startDate() {
    return this._starts_at;
  }

  get endDate() {
    return this._ends_at;
  }

  get youtubeURL() {
    return this._youtube_url;
  }

  /* Linked resources */
  //Returns undefined or an ImageAsset
  get image() {
    return this._image_link.resource;
  }

  get backgroundImage() {
    return this._background_image_link.resource;
  }

  get messages() {
    return this._messages;
  }
}