import { ResultCard } from "./ResultCard";

export class SearchResultHelper {
  constructor (searchPanelAlias) {
    this._searchAlias = searchPanelAlias;
  }

  get suggestedSearchBlock() {
    return cy.get(`@${this._searchAlias}`).find('.suggested-container');
  }

  get noResultsBlock() {
    return cy.get(`@${this._searchAlias}`).find('.no-results');
  }

  /**
   * The first result displayed
   * @returns {Object} - a ResultCard wrapping the first result card displayed
   */
  get firstCard() {
    cy.get(`@${this._searchAlias}`).find('app-hit')
      .should('exist').and('be.visible')
      .first().scrollIntoView()
      .as('firstResultCard');
    return new ResultCard('firstResultCard');
  }

  /**
   * The result linking to the given href
   * @param {string} href - the result should link to this
   * @returns {Object} - a ResultCard wrapping the matching card
   */
  findByHref(href) {
    cy.get(`@${this._searchAlias}`).find(`[class*="hit-title"][href="${href}"]`)
      .should('exist').and('be.visible')
      .parents('app-hit').first().scrollIntoView()
      .as('resultCard');
    return new ResultCard('resultCard');
  }
}
