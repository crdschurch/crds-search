import { MessageManager } from '../Contentful/Models/MessageModel';
import { SeriesManager } from '../Contentful/Models/SeriesModel';
import { AlgoliaResultManager } from '../Algolia/AlgoliaResultManager';

/*
* Note: Since we are not modifying entries in Contentful, these tests only passively confirm that the message link is stored correctly in Algolia when either the
* Message or Series slug is updated.
*/
describe("Given that the link to a message includes its series, When a message or series is updated, Then the message result should have the correct link:", function () {
  let updatedMessage;
  let messageOnUpdatedSeries;
  before(function () {
    //Retrieve all our test data here for clearer tests
    const messageManager = new MessageManager();
    const seriesManager = new SeriesManager();

    messageManager.saveMostRecentlyUpdatedMessage();
    cy.wrap({ messageManager }).its('messageManager.recentlyUpdatedMessage').should('not.be.undefined').then(() => {
      updatedMessage = messageManager.recentlyUpdatedMessage;
      seriesManager.saveMessageSeries(updatedMessage);
      cy.wrap({ updatedMessage }).its('updatedMessage.series').should('not.be.undefined');
    });

    seriesManager.saveRecentlyUpdatedSeriesWithMessage();
    cy.wrap({ seriesManager }).its('seriesManager.recentlyUpdatedSeries').should('not.be.undefined').then(() => {
      messageOnUpdatedSeries = seriesManager.recentlyUpdatedSeries.getMessageAtIndex(0);
    });
  });

  it('The most recently updated message should have the correct url', function () {
    const resultManager = new AlgoliaResultManager();
    resultManager.searchForKeyword(updatedMessage.title.text);
    cy.wrap({ resultManager }).its('resultManager.areResultsReady').should('be.true').then(() => {
      const messageUrl = updatedMessage.absoluteUrl;
      const match = resultManager.resultList.find(r => {
        return r.url === messageUrl;
      });

      expect(match).to.not.be.undefined;
      expect(match.url).to.equal(messageUrl);
    });
  })

  it('A message in the most recently updated series should have the correct url', function () {
    const resultManager = new AlgoliaResultManager();
    resultManager.searchForKeyword(messageOnUpdatedSeries.title.text);
    cy.wrap({ resultManager }).its('resultManager.areResultsReady').should('be.true').then(() => {
      const messageUrl = messageOnUpdatedSeries.absoluteUrl;
      const match = resultManager.resultList.find(r => {
        return r.url === messageUrl;
      });

      expect(match).to.not.be.undefined;
      expect(match.url).to.equal(messageUrl);
    });
  })
});