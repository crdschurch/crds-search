export class SearchBar {
  /**
   * Types a keyword into the search bar.
   *
   * @param {string} keyword
   * @param {number} charEntryDelay (ms)
   */
  static enterKeyword(keyword, charEntryDelay = 10) {
    SearchBar.clear();

    cy.get('.ais-SearchBox-input').as('searchField');
    return cy.get('@searchField').type(keyword, { delay: charEntryDelay });
  }

  static clear(){
    cy.get('.ais-SearchBox-input').as('searchField').clear();
    cy.get('@searchField').should('have.prop', 'value', '');
  }
}
