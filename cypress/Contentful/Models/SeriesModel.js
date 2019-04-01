// import { TextField } from '../Fields/TextField';
// import { ImageField } from '../Fields/ImageField';
// import { DateField } from '../Fields/DateField';
// import { ContentfulApi } from '../ContentfulApi';
// import { MessageModel } from './MessageModel';

// export class LinkHelper {
//   constructor(linkObject, includesObject){
//     this._type = linkObject.sys.linkType;
//     this._id = linkObject.sys.id;
//     this._object_list = includesObject[this._type];
//   }

//   get isPublished(){
//     if(this._object_list === undefined){
//       return false;
//     }

//     return this.linkObject !== undefined;
//   }

//   //this is the stuff you can make into a model
//   get linkObject(){
//     if(this._link_object === undefined && this._object_list !== undefined){
//       this._link_object = this._object_list.find(a => a.sys.id === this._id);
//     }
//     return this._link_object;
//   }
// }

// export class SeriesManager {
//   saveMessageSeries(messageModel) {
//     const seriesList = ContentfulApi.getEntryCollection('content_type=series&select=sys.id,fields.published_at,fields.videos&order=-fields.starts_at&limit=6');
//     cy.wrap({ seriesList }).its('seriesList.responseReady').should('be.true').then(() => {
//       const responseList = seriesList.responseBody.items;

//       const seriesWithMessage = responseList.find(s => {
//         let videoList = s.fields.videos;
//         if (videoList !== undefined)
//           return videoList.find(v => v.sys.id === messageModel.id) !== undefined;
//         return false;
//       });

//       //Handle if the series is unpublished
//       if (seriesWithMessage !== undefined) {
//         const seriesFullEntry = ContentfulApi.getSingleEntry(seriesWithMessage.sys.id);
//         cy.wrap({ seriesFullEntry }).its('seriesFullEntry.responseReady').should('be.true').then(() => {
//           messageModel.series = new SeriesModel(seriesFullEntry.responseBody.fields);
//         });
//       }
//       else {
//         messageModel.series = null;
//       }
//     });
//   }

//   saveRecentlyUpdatedSeriesWithMessage() {
//     const seriesList = ContentfulApi.getEntryCollection('content_type=series&order=-sys.updatedAt&limit=3');
//     cy.wrap({ seriesList }).its('seriesList.responseReady').should('be.true').then(() => {
//       seriesList.responseBody.items.forEach(s => {
//         s.fields.videos.forEach(v =>{
//           let messageLink = new LinkHelper(v, seriesList.responseBody.includes);

//           if(messageLink.isPublished){
//             this._recently_updated_series = new SeriesModel(s.fields);
//             const message = new MessageModel(messageLink.linkObject);
//             message.series = this._recently_updated_series;
//             this._recently_updated_series.saveMessage(message);
//             return;
//           }
//         });
//       });
//     });
//   }

//   get recentlyUpdatedSeries()
//   {
//     return this._recently_updated_series;
//   }
// }

// export class SeriesModel {
//   constructor (responseItem) {
//     this._title = new TextField(responseItem.title);
//     this._title.required = true;

//     this._slug = new TextField(responseItem.slug);
//     this._slug.required = true;

//     this._description = new TextField(responseItem.description);

//     this._published_at = new DateField(responseItem.published_at);
//     this._published_at.required = true;

//     this._image = new ImageField(responseItem.image);
//     this._background_image = new ImageField(responseItem.background_image);
//     this._starts_at = new DateField(responseItem.starts_at);
//     this._ends_at = new DateField(responseItem.ends_at);
//     this._youtube_url = new TextField(responseItem.youtube_url);
//     this._messages = [];
//   }

//   get title() {
//     return this._title;
//   }

//   get slug() {
//     return this._slug;
//   }

//   get relativeUrl() {
//     return `/series/${this.slug.text}`;
//   }

//   get absoluteUrl() {
//     return `${Cypress.env('CRDS_MEDIA_ENDPOINT')}/series/${this.slug.text}`;
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

//   get startDate() {
//     return this._starts_at;
//   }

//   get endDate() {
//     return this._ends_at;
//   }

//   get publishedAt() {
//     return this._published_at;
//   }

//   get youtubeURL() {
//     return this._youtube_url;
//   }

//   saveMessage(messageModel){
//     this._messages.push(messageModel);
//   }

//   getMessageAtIndex(index){
//     return this._messages[index];
//   }
// }