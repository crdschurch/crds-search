import { ContentBlockQueryManager } from '../../Contentful/QueryManagers/ContentBlockQueryManager';
import { SearchPanelFactory } from '../../support/SearchPanel';

describe('The pre-search content block should be displayed:', function () {
  let preSearchContentBlock;
  let search;
  before(function () {
    const cbqm = new ContentBlockQueryManager()
    cbqm.fetchContentBlockByTitle('suggestedSearch').then(() => {
      preSearchContentBlock = cbqm.queryResult;
    });
  })

  beforeEach(function () {
    cy.visit('/prayer');

    //DE6720 - force open the modal
    cy.get('button[data-target="#searchModal"]').first().click({ force: true });
    search = SearchPanelFactory.MobileSharedHeaderSearchModal();
  });

  it('Before a search', function () {
    search.results.suggestedSearchBlock.as('preSearchContent')
      .should('be.visible')
      .displayedText().should('contain', preSearchContentBlock.content.displayedText);
  });


  it('After the search bar is cleared using the icon', function () {
    const searchString = 'a'
    search.clearedSearchField.type(searchString).then(() => {
      search.results.firstCard.title.should('be.visible').then(() => {
        search.resetIcon.as('clearSearchIcon').click();
        search.results.suggestedSearchBlock.as('preSearchContent')
          .should('be.visible')
          .displayedText().should('contain', preSearchContentBlock.content.displayedText);
      })
    })
  });

  it('After the search bar is cleared manually', function () {
    const searchString = 'a'
    search.searchField.type(searchString).then(() => {
      search.results.firstCard.title.should('be.visible').then(() => {
        search.clearedSearchField.then(() => {
          search.results.suggestedSearchBlock.as('preSearchContent')
            .should('be.visible')
            .displayedText().should('contain', preSearchContentBlock.content.displayedText);
        });
      });
    });
  });
});