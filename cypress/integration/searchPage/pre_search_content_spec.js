import { ContentBlockQueryManager } from '../../Contentful/QueryManagers/ContentBlockQueryManager';
import { SearchPanelFactory } from '../../support/SearchPanel';

describe('The pre-search content block should be displayed:', function () {
  let preSearchContentBlock;
  let search;
  beforeEach(function () {
    cy.visit('/search');

    const cbqm = new ContentBlockQueryManager()
    cbqm.fetchContentBlockByTitle('suggestedSearch').then(() =>{
      preSearchContentBlock = cbqm.queryResult;
    })

    search = SearchPanelFactory.SearchPage();
    search.suggestedSearchBlock.as('preSearchContent');
  });

  it('Before a search', function () {
    cy.get('@preSearchContent').should('be.visible').displayedText().then(elementText =>{
      expect(elementText).to.contain(preSearchContentBlock.content.displayedText);
    })
  });

  it('After the search bar is cleared using the icon or manually', function () {
    const searchString = 'a'
    search.clearedSearchField.type(searchString).then(() => {
      search.resetIcon.as('clearSearchIcon').click();
      cy.get('@preSearchContent').should('be.visible').displayedText().then(elementText =>{
        expect(elementText).to.contain(preSearchContentBlock.content.displayedText);
      })
    })

    search.searchField.type(searchString).then(() => {
      search.clearedSearchField;

      cy.get('@preSearchContent').should('be.visible').displayedText().then(elementText =>{
        expect(elementText).to.contain(preSearchContentBlock.content.displayedText);
      })
    });
  });
});