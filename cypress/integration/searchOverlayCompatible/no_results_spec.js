import { SearchPanelFactory } from '../../support/SearchPanel';
//TODO check absolute links - make sure env is set correctly
describe('Concerning searches with no results:', function () {
  const noResultsKeyword = 'a7';
  let search;

  before(function() {
    cy.visit('/search');
  });

  beforeEach(function () {
    search = SearchPanelFactory.SearchPage();
  });

  //Use below for testing the search overlay
  // before(function () {
  //   cy.visit('/prayer');

  //   //DE6720 - force open the modal
  //   cy.get('button[data-target="#searchModal"]').first().click({ force: true });
  // });

  // beforeEach(function () {
  //   search = SearchPanelFactory.MobileSharedHeaderSearchModal();
  // });

  //TODO move to smoke test suite?
  it('When a keyword returns no results, the expected "no results" message is displayed', function () {
    search.clearedSearchField.type(noResultsKeyword).then(() => {
      search.results.noResultsBlock.as('noResultsBlock').should('be.visible')
        .find('[data-automation-id="no-results-message"]').as('noResultsMessage');

      cy.get('@noResultsMessage').text().should('eq', `We can't find anything for ${noResultsKeyword}.`);
    });
  });

  it('When a successful search is made after a no-results search, results are displayed', function () {
    search.clearedSearchField.type(noResultsKeyword).then(() => {
      search.results.noResultsBlock.as('noResultsBlock').should('be.visible').then(() => {
        search.clearedSearchField.type('god').then(() => {
          search.results.firstCard.title.should('be.visible');
          search.results.noResultsBlock.should('not.exist');
        });
      });
    });
  });
});