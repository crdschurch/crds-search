export class SearchBar {
  static enterKeyword(keyword) {
    SearchBar.clear();

    cy.get('.ais-SearchBox-input').as('searchField');
    return cy.get('@searchField').type(keyword);
  }

  static clear(){
    cy.get('.ais-SearchBox-input').as('searchField').clear();
    cy.get('@searchField').should('have.prop', 'value', '');
  }
}
