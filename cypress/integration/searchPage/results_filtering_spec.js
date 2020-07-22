describe('Tests result filters', () => {
  before(() => {
    cy.visit('/search');
  });

  it('checks filters are displayed after search', () => {
    const searchString = 'god';
    cy.searchFor(searchString);
    cy.get('.ais-Menu').as('filterList').should('be.visible');
  });

  it('checks filter is applied when clicked', () => {
    const searchString = 'god'
    const filter = 'message';

    cy.searchFor(searchString);

    cy.contains(filter).as('filter')
    .click({force: true})
      .then(() => {
        cy.get('app-hit').each(($el) => {
          cy.wrap($el).should('have.prop', 'className')
            .and('include', `hit-${filter}`);
        });
      });
  });
});