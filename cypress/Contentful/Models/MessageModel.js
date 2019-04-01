// import { TextField } from '../Fields/TextField';
// import { ImageField } from '../Fields/ImageField';
// import { DateField } from '../Fields/DateField';
// import { ContentfulApi } from '../ContentfulApi';

// export class MessageManager {
//   saveMostRecentlyUpdatedMessage(){
//     const sortedMessageList = ContentfulApi.getEntryCollection('content_type=message&order=-sys.updatedAt&limit=1');
//     cy.wrap({ sortedMessageList }).its('sortedMessageList.responseReady').should('be.true').then(() => {
//       this._recently_updated_message = new MessageModel(sortedMessageList.responseBody.items[0]);
//     });
//   }

//   get recentlyUpdatedMessage(){
//     return this._recently_updated_message;
//   }
// }

// export class MessageModel {
//   constructor (responseItem) {
//     this._id = responseItem.sys.id;
//     this._title = new TextField(responseItem.fields.title);
//     this._title.required = true;

//     this._slug = new TextField(responseItem.fields.slug);
//     this._slug.required = true;

//     this._published_at = new DateField(responseItem.fields.published_at);
//     this._published_at.required = true;

//     this._description = new TextField(responseItem.fields.description);
//     this._image = new ImageField(responseItem.fields.image);
//     this._background_image = new ImageField(responseItem.fields.background_image);
//   }

//   get id() {
//     return this._id;
//   }

//   get title() {
//     return this._title;
//   }

//   get slug() {
//     return this._slug;
//   }

//   //Series for this message must be stored first
//   get absoluteUrl() {
//     if (this.series === null) {
//       return `${Cypress.env('CRDS_MEDIA_ENDPOINT')}/series/${this.slug.text}`;
//     }
//     else {
//       return `${Cypress.env('CRDS_MEDIA_ENDPOINT')}/series/${this.series.slug.text}/${this.slug.text}`;
//     }
//   }

//   get description() {
//     return this._description;
//   }

//   get image() {
//     return this._image;
//   }

//   get backgroundImage() {
//     return this._background_image;
//   }

//   get publishedAt() {
//     return this._published_at;
//   }

//   get series() {
//     return this._series;
//   }

//   //Set to:
//   //null if series is unpublished or does not exist in Contentful
//   //SeriesModel object if series exists
//   set series(seriesModel) {
//     this._series = seriesModel;
//   }
// }