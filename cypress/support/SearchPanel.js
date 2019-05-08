//Convenience class with pre-defined search panels
export class SearchPanelFactory {
  /**
   * Returns the SearchPanel for /search. Test must have /search open before calling this.
   */
  static SearchPage() {
    cy.get('app-root').find('.search-panel').as('searchPanel');
    return new SearchPanel('searchPanel');
  }

  /**
   * Returns the SearchPanel for the mobile version of the Shared Header
   */
  static MobileSharedHeaderSearchModal() {
    cy.get('#mobile-search').find('.search-panel').as('searchPanel');
    return new SearchPanel('searchPanel');
  }
}

class SearchPanel {
  constructor (panelAlias) {
    this._panelAlias = panelAlias;
  }

  get searchField() {
    return cy.get(`@${this._panelAlias}`).find('.ais-SearchBox-input');
  }

  /**
   * The search field element, guaranteed empty.
   */
  get clearedSearchField() {
    this.searchField.as('searchField').clear();
    cy.get('@searchField').should('have.prop', 'value', '');
    return this.searchField;
  }

  /**
   * The 'x' element in the search field, only available when it contains text.
   */
  get resetIcon() {
    return cy.get(`@${this._panelAlias}`).find('.ais-SearchBox-reset');
  }

  /**
   * Returns a helper class for interacting with result cards and content blocks in the result space.
   */
  get results() {
    return new SearchResultHelper(this._panelAlias);
  }

  /**
   * Returns a helper class for interacting with the filter menu. Only available after a successful search.
   */
  get filters() {
    return new SearchFilterHelper(this._panelAlias);
  }
}

class SearchResultHelper {
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

class SearchFilterHelper {
  constructor (searchPanelAlias) {
    this._searchAlias = searchPanelAlias;
  }

  /**
   * Returns a Cypress promise for the current filter's name
   */
  get selectedFilterName() {
    return cy.get(`@${this._searchAlias}`).find('[class="ais-Menu-item ais-Menu-item--selected"]').find('.ais-Menu-label').text();
  }

  /**
   * Given the filter's name, selects it and returns the selected element.
   * @param {String} filterName
   */
  selectFilter(filterName) {
    return this._filterMenu().contains('[class="ais-Menu-item"]', filterName)
      .should('be.visible') //Verify this is visible since we need to force the click to avoid flaky tests due to erroneous 'element not visible' errors on click
      .click({ force: true }).then(() => {
        //Clicking the filter removes the original element from the DOM, so re-find it and return
        return cy.get(`@${this._searchAlias}`).contains('[class="ais-Menu-item ais-Menu-item--selected"]', filterName)
      })
  }

  /**
   * Returns a Cypress promise of the filter menu with all filters displayed
   * @returns the search menu element
   */
  _filterMenu() {
    cy.get(`@${this._searchAlias}`).find('.ais-Menu').as('filterMenu');
    return cy.get('@filterMenu').should('have.prop', 'textContent').then(text => {
      //Display hidden filters
      if (text.includes('Show more')) {
        return cy.get('@filterMenu').find('.ais-Menu-showMore').click().then(() => {
          //Wait until all filters are visible
          return cy.get('@filterMenu').contains('Show less').then(() => {
            return cy.get('@filterMenu');
          })
        })
      } else {
        return cy.get('@filterMenu');
      }
    })
  }
}

class ResultCard {
  constructor (cardAlias) {
    this._cardAlias = cardAlias;
  }

  get image() {
    return cy.get(`@${this._cardAlias}`).find('.hit-img');
  }

  get imageTimestampOverlay() {
    return this.image.should('exist').find('.card-stamp');
  }

  get category() {
    return cy.get(`@${this._cardAlias}`).find('[data-automation-id="hit-category"]');
  }

  get title() {
    return cy.get(`@${this._cardAlias}`).find('.hit-title');
  }

  get description() {
    return cy.get(`@${this._cardAlias}`).find('[data-automation-id="hit-description"]');
  }

  get author() {
    return cy.get(`@${this._cardAlias}`).find('.hit-author');
  }

  get date() {
    return cy.get(`@${this._cardAlias}`).find('.hit-date');
  }

  get seriesDate() {
    return cy.get(`@${this._cardAlias}`).find('.hit-series-date');
  }

  get hitUrl() {
    return cy.get(`@${this._cardAlias}`).find('.hit-url');
  }

  get series() {
    return cy.get(`@${this._cardAlias}`).find('.hit-series');
  }

  get serviceTimes() {
    return cy.get(`@${this._cardAlias}`).find('[data-automation-id="hit-serviceTimes"]');
  }

  get directionsLink() {
    return cy.get(`@${this._cardAlias}`).find('[data-automation-id="hit-directions"]');
  }
}