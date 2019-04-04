import { ContentfulLibrary } from 'crds-cypress-tools';
// import { MessageEntry } from '../Shared/messageEntry';
import { SeriesQueryManager } from './SeriesQueryManager';

export class MessageQueryManager {
  fetchRecentlyUpdatedMessage(){
    this._query_result = undefined;
    const messageList = ContentfulLibrary.query.entryList(`${this._requiredQueryParameters}&order=-sys.updatedAt&limit=1`);
    return cy.wrap({ messageList }).its('messageList.responseReady').should('be.true').then(() => {
      const updatedMessage = messageList.responseBody.items[0];
      const sqm = new SeriesQueryManager();
      return sqm.fetchSeriesForMessage(updatedMessage.sys.id).then(() => {
        const series = sqm.queryResult;
        this._query_result = new ContentfulLibrary.entry.message(updatedMessage, series);
      });
    });
  }

  //OLD
  // saveMostRecentlyUpdatedMessage(){
  //   const sortedMessageList = ContentfulLibrary.query.entryList('content_type=message&order=-sys.updatedAt&limit=1');
  //   cy.wrap({ sortedMessageList }).its('sortedMessageList.responseReady').should('be.true').then(() => {
  //     this._recently_updated_message = new MessageModel(sortedMessageList.responseBody.items[0]);
  //   });
  // }

  // get recentlyUpdatedMessage(){
  //   return this._recently_updated_message;
  // }

  get queryResult() {
    return this._query_result;
  }

  get _requiredQueryParameters() {
    const now = Cypress.moment(Date.now()).utc().format();
    return `content_type=message&fields.published_at[lte]=${now}`;
  }
}
