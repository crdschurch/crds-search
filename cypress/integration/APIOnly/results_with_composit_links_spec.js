import { AlgoliaAPI } from '../../Algolia/AlgoliaAPI';
import { SeriesQueryManager } from '../../Contentful/QueryManagers/SeriesQueryManager';
import { MessageQueryManager } from '../../Contentful/QueryManagers/MessageQueryManager';
//TODO EpisodeQueryManager, PodcastQueryManager


/*
* Note: Since we are not modifying entries in Contentful, these tests only passively confirm that the message link is stored correctly in Algolia when either the
* Message or Series slug is updated.
*/
describe("Given that the link to a message includes its series, When a message or series is updated, Then the message result should have the correct link:", function () {
  it('The most recently updated message should have the correct url', function () {
    const mqm = new MessageQueryManager();
    mqm.fetchRecentlyUpdatedMessage().then(() => {
      const updatedMessage = mqm.queryResult;
      const messageURL = updatedMessage.URL.absolute;

      AlgoliaAPI.searchByKeyword(updatedMessage.title.text).then(response => {
        expect(response).to.have.property('hits').with.property('length').gte('0');
        return response.hits;
      }).then(results => {
        const match = results.find(r => {
          return r.url === messageURL;
        });
        expect(match.url).to.equal(messageURL);
      })
    })
  })

  it('A message in the most recently updated series should have the correct url', function () {
    const sqm = new SeriesQueryManager();
    sqm.saveRecentlyUpdatedSeriesWithMessage().then(() => {
      const updatedSeries = sqm.queryResult;

      updatedSeries.fetchPublishedMessages().then(() => {
        cy.wrap({ updatedSeries }).its('updatedSeries.messages').should('have.length.gte', 1).then(() => {
          return updatedSeries.messages[0];
        });
      });
    }).then(firstMessage => {
      const messageURL = firstMessage.URL.absolute;

      AlgoliaAPI.searchByKeyword(firstMessage.title.text).then(response => {
        expect(response).to.have.property('hits').with.property('length').gte('0');
        return response.hits;
      }).then(results => {
        const match = results.find(r => {
          return r.url === messageURL;
        });
        expect(match.url).to.equal(messageURL);
      })
    })
  })
});


describe("Given that the link to a podcast episode includes its podcast, When an episode or podcast is updated, Then the episode result should have the correct link:", function () {
  it('The most recently updated message should have the correct url', function () {
    const mqm = new MessageQueryManager();
    mqm.fetchRecentlyUpdatedMessage().then(() => {
      const updatedMessage = mqm.queryResult;
      const messageURL = updatedMessage.URL.absolute;

      AlgoliaAPI.searchByKeyword(updatedMessage.title.text).then(response => {
        expect(response).to.have.property('hits').with.property('length').gte('0');
        return response.hits;
      }).then(results => {
        const match = results.find(r => {
          return r.url === messageURL;
        });
        expect(match.url).to.equal(messageURL);
      })
    })
  })
})