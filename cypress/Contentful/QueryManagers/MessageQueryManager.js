import { ContentfulLibrary } from 'crds-cypress-tools';
import { SeriesQueryManager } from './SeriesQueryManager';

export class MessageQueryManager {
  constructor(){
    this._now = Cypress.moment(Date.now()).utc().format();
  }

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

  get queryResult() {
    return this._query_result;
  }

  get _requiredQueryParameters() {
    return `content_type=message&fields.published_at[lte]=${this._now}`;
  }
}
