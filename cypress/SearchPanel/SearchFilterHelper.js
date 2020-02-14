export class SearchFilterHelper {
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
      .scrollIntoView()
      .should('be.visible') //Verify this is visible since we need to force the click to avoid flaky tests due to erroneous 'element not visible' errors on click
      .click({ force: true }).then(() => {
        //Clicking the filter removes the original element from the DOM, so re-find it and return
        return cy.get(`@${this._searchAlias}`).contains('[class="ais-Menu-item ais-Menu-item--selected"]', filterName);
      });
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
          });
        });
      }
      else {
        return cy.get('@filterMenu');
      }
    });
  }
}
