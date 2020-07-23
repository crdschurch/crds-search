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
    cy.get('[data-automation-id="no-results-message"]').as('noResultsMessage')
      .text()
      .should('eq', `We can't find anything for ${noResultsKeyword}.`);
  });

  it('checks no results links', () => {
    cy.get('[data-automation-id="no-results-corkboard-link"]').as('corkboardLink')
      .should('be.visible')
      .should('have.attr', 'href', `${Cypress.env('CRDS_ENDPOINT')}/corkboard`);

    cy.get('[data-automation-id="no-results-groups-link"]').as('groupsLink')
      .should('be.visible')
      .should('have.attr', 'href', `${Cypress.env('CRDS_ENDPOINT')}/groups/search`);
  });

  it('checks success of search after a no-results search', () => {
    cy.get('.no-results').as('noResultsBlock')
      .should('be.visible')
      .then(() => {
        cy.get('@searchField')
          .clear()
          .type('god');

        cy.get('app-hit .hit-title').first().as('firstResultTitle')
          .should('be.visible');

        cy.get('@noResultsBlock')
          .should('not.be.visible');
      });
  });
});
