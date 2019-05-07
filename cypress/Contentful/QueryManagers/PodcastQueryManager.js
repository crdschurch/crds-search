//TODO what if you unpublishe a podcast? what happens to url or episodes?

export class PodcastQueryManager {


  //If there are multiple series with the same message, series with the oldest published_at date will be used in the message's url.
  fetchPodcastForEpisode(episodeId) {
    const seriesList = ContentfulLibrary.query.entryList(`${this._requiredQueryParameters}&links_to_entry=${episodeId}&limit=1`, false);
    return cy.wrap({ seriesList }).its('seriesList.responseReady').should('be.true').then(() => {
      const series = seriesList.responseBody.items[0];
      if (series !== undefined)
        this._query_result = new ContentfulLibrary.entry.series(series);
    });
  }

  get _requiredQueryParameters() {
    return `content_type=podcast`;
  }
}