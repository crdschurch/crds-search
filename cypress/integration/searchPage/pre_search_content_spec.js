import { ContentBlockQueryManager } from '../../Contentful/QueryManagers/ContentBlockQueryManager';
import { SearchBar } from '../../support/SearchBar';

describe('The pre-search content block should be displayed:', function () {
  let preSearchContentBlock;

  beforeEach(function () {
    cy.visit('/');

    const cbqm = new ContentBlockQueryManager()
    cbqm.fetchContentBlockByTitle('suggestedSearch').then(() =>{
      preSearchContentBlock = cbqm.queryResult;
    })

    //Define common elements
    cy.get('app-suggested').find('.suggested-container').as('preSearchContent');
  });

  it('Before a search', function () {
    cy.get('@preSearchContent').should('be.visible').displayedText().then(elementText =>{
      expect(elementText).to.contain(preSearchContentBlock.content.displayedText);
    })
  });

  it('After the search bar is cleared using the icon or manually', function () {
    const searchString = 'a'
    SearchBar.enterKeyword(searchString).then(() =>{
      cy.get('.ais-SearchBox-reset').as('clearSearchIcon').click();
      cy.get('@preSearchContent').should('be.visible').displayedText().then(elementText =>{
        expect(elementText).to.contain(preSearchContentBlock.content.displayedText);
      })
    })

    SearchBar.enterKeyword(searchString).then(()=>{
      SearchBar.clear();

      cy.get('@preSearchContent').should('be.visible').displayedText().then(elementText =>{
        expect(elementText).to.contain(preSearchContentBlock.content.displayedText);
      })
    });
  });
});