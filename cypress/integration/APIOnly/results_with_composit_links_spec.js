import { AlgoliaAPI } from '../../Algolia/AlgoliaAPI';
import { ContentfulLibrary } from 'crds-cypress-tools';

/*
* Note: Since we are not modifying entries in Contentful, these tests only passively confirm that the message link is stored correctly in Algolia when either the
* Message or Series slug is updated.
*/
describe("Given that the link to a message includes its series, When a message or series is updated, Then the message result should have the correct link:", function () {
  it('The most recently updated message should have the correct url', function () {
    const mqm = new ContentfulLibrary.queryManager.messageQueryManager();
    mqm.fetchSingleEntry(mqm.query.orderBy.updatedMostRecently).then(message => {
      const updatedMessage = message;
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
    const sqm = new ContentfulLibrary.queryManager.seriesQueryManager();
    sqm.fetchSingleEntry(`${sqm.query.orderBy.updatedMostRecently}&${sqm.query.messageExists(true)}`).then(series => {
      const updatedSeries = series;

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