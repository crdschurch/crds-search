import { SearchPanelFactory } from "../../support/SearchPanel";

describe('Tests pagination behavior', () => {
  let search;

  before(() => {
    cy.visit('/search');
  });

  beforeEach(() => {
    search = SearchPanelFactory.SearchPage();
  });

  describe(`Tests if results don't fit on one page`, () => {
    beforeEach(() => {
      const searchString = 'god'
      search.clearedSearchField.type(searchString);
    });

    it('checks "Show More" button displayed', () => {
      cy.get('.hits-show-more-container').should('be.visible');
    });

    it('checks result count text matches format', () => {
      cy.get('[data-automation-id="hits-hit-counter"]').as('resultCount').should('be.visible');
      cy.get('@resultCount').displayedText().then(txt => {
        const resultRegex = /showing\W+(\d+)\W+of\W+(\d+)\W+results/;
        expect(resultRegex.test(txt)).to.be.true;

        const match = resultRegex.exec(txt);
        expect(parseInt(match[1], 10)).to.be.lessThan(parseInt(match[2], 10));
        expect(parseInt(match[1], 10)).to.be.greaterThan(0);
      });
    });
  });

  describe('Tests if results fit on one page', () => {
    beforeEach(() => {
      const lowResultString = 'abc';
      search.clearedSearchField.type(lowResultString);
    });

    it('checks "Show More" button is not displayed', () => {
      cy.get('.hits-show-more-container').should('not.exist');
    });

    it('checks result count text matches format', () => {
      cy.get('[data-automation-id="hits-hit-counter"]').as('resultCount').should('be.visible');
      cy.get('@resultCount').displayedText().then(txt => {
        const resultRegex = /(\d+)\W+results/;
        expect(resultRegex.test(txt)).to.be.true;

        const match = resultRegex.exec(txt);
        expect(parseInt(match[1], 10)).to.be.greaterThan(0);
      });
    });
  });
});