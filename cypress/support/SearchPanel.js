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
    this._alias = panelAlias;
  }

  get searchField() {
    return cy.get(`@${this._alias}`).find('.ais-SearchBox-input');
  }

  get clearedSearchField() {
    this.searchField.as('searchField').clear();
    cy.get('@searchField').should('have.prop', 'value', '');
    return this.searchField;
  }

  //X in the search field iff it has text
  get resetIcon() {
    return cy.get(`@${this._alias}`).find('.ais-SearchBox-reset');
  }

  /**
   * Results/Suggested
   */
  get suggestedSearchBlock() {
    return cy.get(`@${this._alias}`).find('.suggested-container');
  }

  get noResultsBlock() {
    return cy.get(`@${this._alias}`).find('.no-results');
  }

  get resultList() {
    return cy.get(`@${this._alias}`).find('app-hit');
  }

  //This doesn't return the full card context - only the title line.
  getResultTitlesByHref(href) {
    return cy.get(`@${this._alias}`).find(`[class*="hit-title"][href="${href}"]`)
  }

  getResultCardByHref(href) {
    return this.getResultTitlesByHref(href).parents('app-hit');
  }

  // getFirstResultCardByHref(href) {
  //   const resultAlias = 'result';
  //   this.getResultTitlesByHref(href).parents('app-hit').first().as(resultAlias).should('have.length', 'eq', 1); //TODO make sure the first does not fail if empty
  //   return new ResultCard(resultAlias);
  // }

  /**
   * Filters
   */
  getFilterByName(filterName) {
    return cy.get(`@${this._alias}`).find('.ais-Menu').should('have.prop', 'textContent').then(text => {
      if(text.includes('Show more')) {
        cy.get(`@${this._alias}`).find('.ais-Menu-showMore').click();
      }
    }).then(() => {
      return cy.get(`@${this._alias}`).find('.ais-Menu-label').contains(filterName);
    })
  }

  get filterList() {
    return cy.get(`@${this._alias}`).find('.ais-Menu-link')
  }

  get filterNames() {
    return this.filterList.find('.ais-Menu-label');
  }

  get selectedFilter() {
    return cy.get(`@${this._alias}`).find('[class="ais-Menu-item ais-Menu-item--selected"]').find('.ais-Menu-link')
  }

  get selectedFilterLabel() {
    return cy.get(`@${this._alias}`).find('[class="ais-Menu-item ais-Menu-item--selected"]').find('.ais-Menu-label')
  }

  get filterMenu() {
    return cy.get(`@${this._alias}`).find('.ais-Menu');
  }

  get showMoreFilters() {
    return cy.get(`@${this._alias}`).find('.ais-Menu-showMore');
  }
}

export class TheFilter {
  constructor (filterMenuElement) {
    this._menu = cy.wrap(filterMenuElement);
  }

  getFilterByName(filterName) {
    return this._menu.find('.ais-Menu-label').contains(filterName);
  }

  get selectedFilterLabel() {
    return this._menu.find('[class="ais-Menu-item ais-Menu-item--selected"]').find('.ais-Menu-label')
  }
}

export class ResultCard {
  constructor(cardAlias){
    this._alias = cardAlias;
  }

  get image(){
    return cy.get(`@${this._alias}`).find('.hit-img');
  }

  get imageTimestampOverlay() {
    return this.image.find('.card-stamp');
  }

  get category() {
    return cy.get(`@${this._alias}`).find('[data-automation-id="hit-category"]');
  }

  get title() {
    return cy.get(`@${this._alias}`).find('.hit-title');
  }

  get description() {
    return cy.get(`@${this._alias}`).find('[data-automation-id="hit-description"]');
  }

  get author() {
    return cy.get(`@${this._alias}`).find('.hit-author');
  }

  get date() {
    return cy.get(`@${this._alias}`).find('.hit-date');
  }

  get seriesDate() {
    return cy.get(`@${this._alias}`).find('.hit-series-date');
  }

  get hitUrl() {
    return cy.get(`@${this._alias}`).find('.hit-url');
  }

  get series() {
    return cy.get(`@${this._alias}`).find('.hit-series');
  }

  get serviceTimes() {
    return cy.get(`@${this._alias}`).find('[data-automation-id="hit-serviceTimes"]');
  }

  get directionsLink() {
    return cy.get(`@${this._alias}`).find('[data-automation-id="hit-directions"]');
  }
}