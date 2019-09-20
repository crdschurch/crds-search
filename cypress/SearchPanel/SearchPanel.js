import { SearchFilterHelper } from "./SearchFilterHelper";
import { SearchResultHelper } from "./SearchResultHelper";

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