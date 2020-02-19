import { SearchPanelFactory } from '../../SearchPanel/SearchPanel';

function getUrlWithQuery(keyword, filterLabel = undefined) {
  const encodedKeyword = encodeURI(keyword);
  let url = `${Cypress.config().baseUrl}/search?query=${encodedKeyword}`
  if (filterLabel !== undefined) {
    url = `${url}&menu%5BcontentType%5D=${filterLabel}`
  }
  return url;
}

describe('Tests query params added to url', () => {
  let search;
  beforeEach(() => {
    cy.visit('/search');
    search = SearchPanelFactory.SearchPage();
  });

  it('checks keyword added to url', () => {
    const keyword = 'God';
    const expectedUrl = getUrlWithQuery(keyword);

    search.clearedSearchField.type(keyword, { delay: 1000 }).then(() => {
      search.searchField.should('have.prop', 'value', keyword).then(() => {
        cy.url().should('eq', expectedUrl);
      });
    });
  });

  it('checks keyword and filter added to url', () => {
    const keyword = 'God';
    const filter = 'message';
    const expectedUrl = getUrlWithQuery(keyword, filter);

    search.clearedSearchField.type(keyword).then(() => {
      search.searchField.should('have.prop', 'value', keyword).then(() => {
        search.filters.selectFilter(filter).then(() => {
          cy.url().should('eq', expectedUrl);
        });
      });
    });
  });
});

describe('Tests query params in url trigger search automatically', () => {
  it('checks search triggered by keyword', () => {
    const urlWithQuery = getUrlWithQuery('god');

    cy.visit(urlWithQuery);

    const search = SearchPanelFactory.SearchPage();
    search.results.firstCard.title.should('be.visible');
  });

  it('checks search triggered by keyword and then filtered', () => {
    const filter = 'message';
    const urlWithFilteredQuery = getUrlWithQuery('god', filter);

    cy.visit(urlWithFilteredQuery);

    const search = SearchPanelFactory.SearchPage();
    search.filters.selectedFilterName.should('eq', filter);
    search.results.firstCard.title.should('be.visible');
  });
});