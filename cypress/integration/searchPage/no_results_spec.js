import { Formatter } from '../../support/Formatter';
import { SearchBar } from '../../support/SearchBar';

describe('Concerning searches with no results:', function () {
  beforeEach(function () {
    cy.visit('/search');
  });

  it('When a keyword returns no results, the expected "no results" message is displayed', function () {
    const noResultsKeyword = 'a7'
    SearchBar.enterKeyword(noResultsKeyword).then(() => {
      cy.get('.no-results').as('noResultsBlock');
      cy.get('@noResultsBlock').should('be.visible');

      //No results text matches
      cy.get('@noResultsBlock').find('[data-automation-id="no-results-message"]').as('noResultsMessage');
      cy.get('@noResultsMessage').should('have.prop', 'textContent').then($elementText => {
        expect(Formatter.normalizeText($elementText)).to.contain(Formatter.normalizeText(`We can't find anything for ${noResultsKeyword}.`));
      });
    });
  });

  it('When a keyword returns no results, links to other pages are displayed', function () {
    const noResultsKeyword = 'a7'
    SearchBar.enterKeyword(noResultsKeyword).then(() => {
      cy.get('.no-results').as('noResultsBlock');
      cy.get('@noResultsBlock').should('be.visible');

      //Expected urls exist
      cy.get('@noResultsBlock').find('[data-automation-id="no-results-corkboard-link"]').as('corkboardLink');
      cy.get('@corkboardLink').should('be.visible').and('has.attr', 'href').and('contains', `/corkboard`);

      cy.get('@noResultsBlock').find('[data-automation-id="no-results-groups-link"]').as('groupsLink');
      cy.get('@groupsLink').should('be.visible').and('has.attr', 'href').and('contains', `/groups/search`);
    })
  })

  it('When a successful search is made after a no-results search, results are displayed', function () {
    const noResultsKeyword = 'a7'
    SearchBar.enterKeyword(noResultsKeyword);

    const resultsKeyword = 'god'
    SearchBar.enterKeyword(resultsKeyword).then(() => {
      cy.get('app-hit').first().as('firstResult');
      cy.get('@firstResult').should('be.visible');

      cy.get('app-no-results').find('.no-results').should('not.exist');
    });
  });
})