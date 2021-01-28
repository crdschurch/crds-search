const errorToIgnore = [/.*Script error.*/, /.*uncaught:exception*/, /.*Cannot read property \'replace'\ of undefined*/, /.*> Cannot assign to read only property 'process' of object '[object Window]'*/];
describe('Tests search with no results', () => {

  const noResultsKeyword = 'a7';

  before(() => {
    cy.ignoreMatchingErrors(errorToIgnore);
    cy.visit('/search');
    cy.searchFor(noResultsKeyword);
  });

  beforeEach(() => {
    cy.get('.ais-SearchBox-input').as('searchField');
  });

  it('checks "no results" message is displayed', () => {
    cy.get('.no-results').as('noResultsBlock')
      .should('be.visible');
    cy.get('.font-size-large').as('noResultsMessage')
      .text()
      .should('eq', ` Whoops, we can't find any results matching ${noResultsKeyword}. `);
  });

  it('checks success of search after a no-results search', () => {
    cy.get('.no-results').as('noResultsBlock')
      .should('be.visible')
      .then(() => {
        cy.get('@searchField')
          .clear()
          .type('god');
        cy.wait(30000);
        cy.get('.hit-album').first().as('firstResultTitle')
          .should('be.visible');

        cy.get('@noResultsBlock')
          .should('not.be.visible');
      });
  });
});
