
describe('Tests pagination behavior', () => {
  before(() => {
     cy.visit('/search');
  });

  describe(`Tests if results don't fit on one page`, () => {
    before(() => {
      const searchString = 'god';
      cy.searchFor(searchString);
    });

    it('checks "Show More" button displayed', () => {
      cy.get('.hits-show-more-container')
        .should('be.visible');
    });

    it('checks result count text matches format', () => {
        cy.get('.ais-Menu-count').as('resultCount')
        .should('be.visible')
        cy.get('@resultCount')
        .should('have.length', 30)
    });
  });

  describe('Tests if all results fit on one page', () => {
    before(() => {
      const lowResultString = 'bb';
      cy.searchFor(lowResultString);
    });

    it('checks "Show More" button is not displayed', () => {
      cy.get('.hits-show-more-container')
        .should('not.exist');
    });

    it('checks result count text matches format', () => {
      cy.get('.ais-Menu-count').as('resultCount')
      .should('be.visible')
      cy.get('@resultCount')
      .should('have.length', 8);
    });
  });
});
