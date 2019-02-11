import { Formatter } from '../support/Formatter';

describe('Concerning searches with no results:', function(){
  it('When a keyword returns no results, the expected "no results" message is displayed', function(){
    cy.visit('/');

    const noResultsKeyword = 'aklsdhf;asdfio'
    cy.get('.ais-SearchBox-input').as('searchField');
    cy.get('@searchField').type(noResultsKeyword);

    cy.get('app-no-results').find('.no-results').as('noResultsBlock'); //TODO make sure this find'll fail if it has results
    cy.get('@noResultBlock').should('be.visible');

    //No results text matches
    cy.get('@noResultBlock').find('[data-automation-id="no-results-message"]').as('noResultsMessage');
    cy.get('@noResultsMessage').should('have.prop', 'textContent').then($elementText => {
      expect(Formatter.normalizeText($elementText)).to.contain(`We can't find anything for ${noResultsKeyword}.`);
    });

    //Expected urls exist
    cy.get('@noResultBlock').find('[data-automation-id="no-results-corkboard-link"]').as('corkboardLink');
    cy.get('@corkboardLink').should('be.visible').and('has.attr', 'href', `TODO`)
    //the above should exist
  })

  it('When a successful search is made after a no-results search, results are displayed', function(){

  })

  it('If an empty string is searched for, the "no results" message is not displayed', function(){

  })
})