import { PodcastQueryManager } from "./PodcastQueryManager";

//Episodes know their podcast

export class EpisodeQueryManager{
  constructor(){
    this._now = Cypress.moment(Date.now()).utc().format();
  }

  fetchRecentlyUpdatedEpisode(){
    const updatedMessage = ContentfulLibrary.query.entryList(`${this._requiredQueryParameters}&order=-sys.updatedAt&limit=1`);
    return cy.wrap({ updatedMessage }).its('updatedMessage.responseReady').should('be.true').then(() => {
      const updatedMessage = updatedMessage.responseBody.items[0];
      const pqm = new PodcastQueryManager();

      return pqm.fetchPodcastForEpisode(updatedMessage.sys.id).then(() => {
        const series = pqm.queryResult;
        this._query_result = new ContentfulLibrary.entry.message(updatedMessage, series);
      });
    });
  }

  get _requiredQueryParameters() {
    return `content_type=episode&fields.published_at[lte]=${this._now}`;
  }
}