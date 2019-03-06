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
describe("Given the link to a message includes its series, When a message or series is updated, Then the message result will have the correct link:", function(){
  before(function(){
    cy.visit('/');
  });

 //TODO - don't search for full name -is too long and unnecessary
 //TODO gather series/message info before test - not liking the embedded
  it.only('Searching for the most recently updated message', function (){
    const messageManager = new MessageManager();
    const seriesManager = new SeriesManager();
    messageManager.saveMostRecentlyUpdatedMessage();
    cy.wrap({messageManager}).its('messageManager.recentlyUpdatedMessage').should('not.be.undefined').then(() =>{
      const updatedMessage = messageManager.recentlyUpdatedMessage;
      seriesManager.saveMessageSeries(updatedMessage);
      cy.wrap({updatedMessage}).its('updatedMessage.series').should('not.be.undefined').then(() => {
        SearchBar.enterKeyword(updatedMessage.title.text);

        SearchResult.findResultTitleByHref(updatedMessage.absoluteUrl, 'updatedMessage');
        cy.get('@updatedMessage').should('exist').and('be.visible');
      });
    });
  });

  it('Searching for a message in the most recently updated series', function (){

  });
});