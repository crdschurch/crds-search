//TODO better name
//Encapsulates the search bar/results/etc. - compatible with container and page

export class SearchPanel {
  constructor(panelAlias){
    this.alias = panelAlias;
  }

  get searchField(){
    return cy.get(`@${this.alias}`).find('.ais-SearchBox-input');//.as('searchField');
  }

  get noResultsBlock(){
    return cy.get(`@${this.alias}`).find('.no-results');//.as('noResultsBlock');
  }

  get clearedSearchField(){
    this.searchField.as('searchField').clear();
    cy.get('@searchField').should('have.prop', 'value', '');
    return this.searchField;
  }
}