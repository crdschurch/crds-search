import { Formatter } from '../support/Formatter';

function searchForKeyword(keyword) {
  cy.get('.ais-SearchBox-input').as('searchField');
  cy.get('@searchField').clear();
  cy.get('@searchField').type(keyword);
}

describe('Concerning searches with no results:', function () {
  beforeEach(function (){
    cy.visit('/');
  })

  it('When a keyword returns no results, the expected "no results" message is displayed', function () {
    const noResultsKeyword = 'a7'
    searchForKeyword(noResultsKeyword);

    cy.get('app-no-results').find('.no-results').as('noResultsBlock');
    cy.get('@noResultsBlock').should('be.visible');

    //No results text matches
    cy.get('@noResultsBlock').find('[data-automation-id="no-results-message"]').as('noResultsMessage');
    cy.get('@noResultsMessage').should('have.prop', 'textContent').then($elementText => {
      expect(Formatter.normalizeText($elementText)).to.contain(Formatter.normalizeText(`We can't find anything for ${noResultsKeyword}.`));
    });
  })

  it('When a keyword returns no results, links to other pages are displayed', function () {
    const noResultsKeyword = 'a7'
    searchForKeyword(noResultsKeyword);

    cy.get('app-no-results').find('.no-results').as('noResultsBlock');
    cy.get('@noResultsBlock').should('be.visible');

    //Expected urls exist
    cy.get('@noResultsBlock').find('[data-automation-id="no-results-corkboard-link"]').as('corkboardLink');
    cy.get('@corkboardLink').should('be.visible').and('has.attr', 'href', `${Cypress.env('CRDS_URL')}/corkboard`);

    cy.get('@noResultsBlock').find('[data-automation-id="no-results-groups-link"]').as('groupsLink');
    cy.get('@groupsLink').should('be.visible').and('has.attr', 'href', `${Cypress.env('CRDS_URL')}/groups/search`);
  })

  it('When a successful search is made after a no-results search, results are displayed', function () {
    const noResultsKeyword = 'a7'
    searchForKeyword(noResultsKeyword);

    const resultsKeyword = 'god'
    searchForKeyword(resultsKeyword);

    cy.get('app-hits').find('app-hit').as('firstResult');
    cy.get('@firstResult').should('be.visible');

    cy.get('app-no-results').find('.no-results').should('not.exist');
  })
})