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
      const resultRegex = /showing\W+(\d+)\W+of\W+(\d+)\W+results/;

      cy.get('[data-automation-id="hits-hit-counter"]').as('resultCount')
        .should('be.visible')
        .displayedText()
        .then((txt) => resultRegex.exec(txt))
        .should('have.length', 3)
        .then((match) => {
          const resultsOnPage = parseInt(match[1], 10);
          const totalResults = parseInt(match[2], 10);
          expect(resultsOnPage).to.be.lessThan(totalResults)
            .and.be.greaterThan(0);
        });
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
      const resultRegex = /(\d+)\W+results/;

      cy.get('[data-automation-id="hits-hit-counter"]').as('resultCount')
        .should('be.visible')
        .displayedText()
        .then((txt) => resultRegex.exec(txt))
        .should('have.length', 2)
        .then((match) => {
          const resultCount = parseInt(match[1], 10);
          expect(resultCount).to.be.greaterThan(0);
        });
    });
  });
});
