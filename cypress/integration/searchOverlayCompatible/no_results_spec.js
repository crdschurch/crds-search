import { SearchPanelFactory } from '../../SearchPanel/SearchPanel';

describe('Tests searches with no results:', () => {
  const noResultsKeyword = 'a7';
  let search;

  before(function() {
    cy.visit('/search');
  });

  beforeEach(() => {
    search = SearchPanelFactory.SearchPage();
  });

  //Use below for testing the search overlay
  // before(() => {
  //   cy.visit('/prayer');

  //   //DE6720 - force open the modal
  //   cy.get('button[data-target="#searchModal"]').first().click({ force: true });
  // });

  // beforeEach(() => {
  //   search = SearchPanelFactory.MobileSharedHeaderSearchModal();
  // });

  it('checks "no results" message is displayed', () => {
    search.clearedSearchField.type(noResultsKeyword).then(() => {
      search.results.noResultsBlock.as('noResultsBlock').should('be.visible')
        .find('[data-automation-id="no-results-message"]').as('noResultsMessage');

      cy.get('@noResultsMessage').text().should('eq', `We can't find anything for ${noResultsKeyword}.`);
    });
  });

  it('checks links are for the correct environment', () =>{
    search.clearedSearchField.type(noResultsKeyword).then(() => {
      cy.get('[data-automation-id="no-results-corkboard-link"]').as('corkboardLink').should('be.visible');
      cy.get('@corkboardLink').should('have.attr', 'href', `${Cypress.env('CRDS_ENDPOINT')}/corkboard`);
    });
  });

  it('checks results are displayed when a successful search is made after a no-results search', () => {
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