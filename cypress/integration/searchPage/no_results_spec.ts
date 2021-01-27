describe('Tests search with no results', () => {

  const noResultsKeyword = 'a7';

  before(() => {
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

        cy.get('.hit-album').first().as('firstResultTitle')
          .should('be.visible');

        cy.get('@noResultsBlock')
          .should('not.be.visible');
      });
  });
});
