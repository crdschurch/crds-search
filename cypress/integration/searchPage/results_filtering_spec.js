import { SearchPanelFactory } from "../../SearchPanel/SearchPanel";

describe('Tests result filters', () => {
  let search;

  before(() => {
    cy.visit('/search');
  });

  beforeEach(() => {
    search = SearchPanelFactory.SearchPage();
  });

  it('checks filters are displayed after search', () => {
    const searchString = 'god'
    search.clearedSearchField.type(searchString).then(()=> {
      cy.get('.ais-Menu').as('filterList').should('be.visible');
    });
  });

  it('checks filter is applied when clicked', () => {
    const searchString = 'god'
    const filter = 'message';

    search.clearedSearchField.type(searchString).then(()=> {
      search.filters.selectFilter(filter).then(() => {
        cy.get('app-hit').each(($el) => {
          cy.wrap($el).should('have.prop', 'className').and('have.string', `hit-${filter}`);
        });
      });
    });
  });
});