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
    this.alias = panelAlias;
  }

  get searchField() {
    return cy.get(`@${this.alias}`).find('.ais-SearchBox-input');
  }

  get clearedSearchField() {
    this.searchField.as('searchField').clear();
    cy.get('@searchField').should('have.prop', 'value', '');
    return this.searchField;
  }

  //X in the search field iff it has text
  get resetIcon(){
    return cy.get(`@${this.alias}`).find('.ais-SearchBox-reset');
  }

  /**
   * Results/Suggested
   */
  get suggestedSearchBlock() {
    return cy.get(`@${this.alias}`).find('.suggested-container');
  }

  get noResultsBlock() {
    return cy.get(`@${this.alias}`).find('.no-results');
  }

  get resultList() {
    return cy.get(`@${this.alias}`).find('app-hit');
  }

  //This doesn't return the full card context - only the title line.
  getResultTitlesByHref(href) {
    return cy.get(`@${this.alias}`).find(`[class*="hit-title"][href="${href}"]`)
  }

  /**
   * Filters
   */
  get filterList() {
    return cy.get(`@${this.alias}`).find('.ais-Menu-link')
  }

  get filterNames() {
    return this.filterList.find('.ais-Menu-label');
  }

  get selectedFilter() {
    return cy.get(`@${this.alias}`).find('[class="ais-Menu-item ais-Menu-item--selected"]').find('.ais-Menu-link')
  }
}