import { ContentfulLibrary } from 'crds-cypress-tools';

export class SeriesQueryManager {
  constructor(){
    this._now = Cypress.moment(Date.now()).utc().format();
  }

  /**
  * Warning! Published series are only displayed if their published_at date has passed
  */
   saveRecentlyUpdatedSeriesWithMessage() {
    this._query_result = undefined;
    const seriesList = ContentfulLibrary.query.entryList(`${this._requiredQueryParameters}&order=-sys.updatedAt&fields.videos[exists]=true&limit=5`);
    return cy.wrap({ seriesList }).its('seriesList.responseReady').should('be.true').then(() => {
      //Get entry ids that have a published_at date in the past
      const entriesPastPublishedAt = seriesList.responseBody.includes.Entry.filter(ent => {
        let publishedAt = ent.fields.published_at;
        if(publishedAt !== undefined){
          return Cypress.moment(publishedAt).isBefore(this._now);
        }
        return false;
      });

      expect(entriesPastPublishedAt).to.have.length.gte(1);
      const validEntryIds = entriesPastPublishedAt.map(ent => ent.sys.id);

      //Get series with a message in the valid entry id list
      const series = seriesList.responseBody.items.find(s => {
        let messageIds = s.fields.videos.map(msg => msg.sys.id);
        return messageIds.find(smid => validEntryIds.includes(smid));
      });

      if(series !== undefined){
        this._query_result = new ContentfulLibrary.entry.series(series);
      }
    });
  }

  //If there are multiple series with the same message, series with the oldest published_at date will be used in the message's url.
  fetchSeriesForMessage(messageId) {
    this._query_result = undefined;
    const seriesList = ContentfulLibrary.query.entryList(`${this._requiredQueryParameters}&links_to_entry=${messageId}&order=-fields.published_at&limit=1`, false);
    return cy.wrap({ seriesList }).its('seriesList.responseReady').should('be.true').then(() => {
      const series = seriesList.responseBody.items[0];
      if (series !== undefined)
        this._query_result = new ContentfulLibrary.entry.series(series);
    });
  }

  get queryResult() {
    return this._query_result;
  }

  get _requiredQueryParameters() {
    return `content_type=series&fields.published_at[lte]=${this._now}`;
  }
}