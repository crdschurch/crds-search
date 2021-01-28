const errorToIgnore3 = [/.*Script error.*/, /.*uncaught:exception*/, /.*Cannot read property \'replace'\ of undefined*/, /.*> Cannot assign to read only property 'process' of object '[object Window]'*/];
describe('Tests result filters', () => {
  before(() => {
    cy.ignoreMatchingErrors(errorToIgnore3);
     cy.visit('/search');
    
  });

  it('checks filters are displayed after search', () => {
    const searchString = 'god';
    cy.searchFor(searchString);

    cy.get('.ais-Menu-list').as('filterList')
      .should('be.visible');
  });

  it('checks filter is applied when clicked', () => {
    const searchString = 'god';
    const filter = 'message';


    cy.searchFor(searchString);
    cy.wait(5000)
    cy.get('.search-filters__container > ais-stats > .ais-Stats > :nth-child(1) > app-tab-filter > .filters__container > .ais-Menu-list > :nth-child(9) > .ais-Menu-link > .ais-Menu-label').as('filter')
      .click()
      .then(() => {
        cy.wait(5000)
        cy.get('app-hit').each(($el) => {
          cy.wait(5000)
          cy.wrap($el).should('have.prop', 'className')
            .and('contain', `hit-${filter}`);
        });
      });
  });
});
