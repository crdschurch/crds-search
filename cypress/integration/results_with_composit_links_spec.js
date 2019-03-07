import { MessageManager } from '../Contentful/Models/MessageModel';
import { SeriesManager } from '../Contentful/Models/SeriesModel';
import { SearchBar } from '../support/SearchBar';
import { SearchResult } from '../support/SearchResult';

//message urls are series & message, which means modification of part is possible.
//Same for podcasts+episodes

//find message most recently updated. get series for it. search by series name. verify url matches
//find series most recently updated. get a message on it (that's published - "video" entry will still exist if message is in draft). search by message name & verify url

//Apply similar logic for podcasts & episodes

/*
* Note: Since we are not modifying entries in Contentful, these tests only passively confirm that the message link is stored correctly in Algolia when either the
* Message or Series slug is updated.
*/
//TODO we don't care about the look of the results - can we just do a straight API validation?
describe("Given the link to a message includes its series, When a message or series is updated, Then the message result will have the correct link:", function () {
  let recentMessage;
  let messageOnRecentSeries;
  before(function () {
    const messageManager = new MessageManager();
    const seriesManager = new SeriesManager();

    messageManager.saveMostRecentlyUpdatedMessage();
    cy.wrap({ messageManager }).its('messageManager.recentlyUpdatedMessage').should('not.be.undefined').then(() => {
      recentMessage = messageManager.recentlyUpdatedMessage;
      seriesManager.saveMessageSeries(recentMessage);
      cy.wrap({ recentMessage }).its('recentMessage.series').should('not.be.undefined');
    });

    seriesManager.saveRecentlyUpdatedSeriesWithMessage();
    cy.wrap({ seriesManager }).its('seriesManager.recentlyUpdatedSeries').should('not.be.undefined').then(() => {
      messageOnRecentSeries = seriesManager.recentlyUpdatedSeries.getMessageAtIndex(0);
    });

    cy.visit('/');
  });

  //TODO - don't search for full name -is too long and unnecessary
  it('Searching for the most recently updated message', function () {
    SearchBar.enterKeyword(recentMessage.title.text);

    SearchResult.findResultTitleByHref(recentMessage.absoluteUrl, 'recentMessage');
    cy.get('@recentMessage').should('exist').and('be.visible');
  });

  //What if can set value of search bar to full string, then search, not "type"
  //What if can "type until match found"
  //Could nav to url with search (but is testing multiple things here)

  it('Searching for a message in the most recently updated series', function () {
    SearchBar.enterKeyword(messageOnRecentSeries.title.text);

    SearchResult.findResultTitleByHref(messageOnRecentSeries.absoluteUrl, 'messageOnRecentSeries');
    cy.get('@messageOnRecentSeries').should('exist').and('be.visible');
  });
});

describe('just api me', function(){
  it.only('searches for a thing', function(){
    cy.request({
      method: 'POST',
      url: `https://8y3n3h5pnj-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20vanilla%20JavaScript%20(lite)%203.32.0%3Bangular-instantsearch%202.1.0%3Binstantsearch.js%202.10.4%3BJS%20Helper%202.26.1&x-algolia-application-id=8Y3N3H5PNJ&x-algolia-api-key=609661e7d659e337fe7a1b5bee6b42f0`,
      body: {"requests":[{"indexName":"int_crds","params":"query=art&maxValuesPerFacet=9&page=0&highlightPreTag=__ais-highlight__&highlightPostTag=__%2Fais-highlight__&facets=%5B%22contentType%22%2C%22contentType%22%5D&tagFilters="}]}
    }).then(response =>{
      expect(response.body.results).to.not.be.undefined;
      const hitList = response.body.results[0].hits;
      const result = hitList.find(r => {
        return r.url === 'https://mediaint.crossroads.net/podcasts/ikr/the-art-of-connecting-with-god';
      });
      expect(result).to.not.be.undefined;
    })

  });

  it.only('test out env vars from TS', function(){
    //TODO import { environment } from '../../environments/environment';
    //see if can access variables from this to use in request url
    //IF this method works through demo, use those defined variables elsewhere instead of duplicating

  })
})