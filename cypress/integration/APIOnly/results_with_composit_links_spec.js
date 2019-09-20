import { AlgoliaAPI } from '../../Algolia/AlgoliaAPI';
import { MessageQueryManager, SeriesQueryManager } from 'crds-cypress-contentful';

/*
* Note: Since we are not modifying entries in Contentful, these tests only passively confirm that the message link is stored correctly in Algolia when either the
* Message or Series slug is updated.
*/
describe("Given that the link to a message includes its series, When a message or series is updated, Then the message result should have the correct link:", () => {
  it('The most recently updated message should have the correct url', () => {
    const mqm = new MessageQueryManager();
    mqm.getSingleEntry(mqm.query.orderBy.updatedMostRecently).then(message => {

      message.getURL().then(messageURL => {
        AlgoliaAPI.searchByKeyword(message.title.text).then(response => {
          expect(response).to.have.property('hits').with.property('length').gte('0');

          const match = response.hits.find(r => r.url.includes(messageURL.absolute));
          expect(match).to.not.be.undefined;
        })
      });
    });
  });

  it('A message in the most recently updated series should have the correct url', () => {
    const sqm = new SeriesQueryManager();

    sqm.getSingleEntry(`${sqm.query.orderBy.updatedMostRecently}&${sqm.query.messageExists(true)}`).then(series => {
      expect(series.messageLinks.length).to.be.gte(1);

      series.messageLinks[0].getResource().then(firstMessage => {
        AlgoliaAPI.searchByKeyword(firstMessage.title.text).then(response => {
          expect(response).to.have.property('hits').with.property('length').gte('0');

          firstMessage.getURL().then(messageURL => {
            const match = response.hits.find(r => r.url.includes(messageURL.absolute));
            expect(match).to.not.be.undefined;
          });
        });
      });
    });
  });
});