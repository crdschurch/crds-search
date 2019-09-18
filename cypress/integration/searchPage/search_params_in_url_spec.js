import { SearchPanelFactory } from '../../SearchPanel/SearchPanel';

function getUrlWithQuery(keyword, filterLabel = undefined) {
  const encodedKeyword = encodeURI(keyword);
  let url = `${Cypress.config().baseUrl}/search?query=${encodedKeyword}`
  if (filterLabel !== undefined) {
    url = `${url}&menu%5BcontentType%5D=${filterLabel}`
  }
  return url;
}

describe('When someone searches:', function () {
  let search;
  beforeEach(function () {
    cy.visit('/search');
    search = SearchPanelFactory.SearchPage();
  });

  it('For a keyword, the keyword should be included in the url', function () {
    const keyword = 'God';
    const expectedUrl = getUrlWithQuery(keyword);

    search.clearedSearchField.type(keyword, { delay: 1000 }).then(() => {
      search.searchField.should('have.prop', 'value', keyword).then(() => {
        cy.url().should('eq', expectedUrl);
      });
    });
  });

  it('For a keyword and selects a filter, the keyword and filter should be included in the url', function () {
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

describe('When someone navigates to a search url:', function () {
  it('With a keyword in it, the page should load with the results for the keyword', function () {
    const urlWithQuery = getUrlWithQuery('god');

    cy.visit(urlWithQuery);

    const search = SearchPanelFactory.SearchPage();
    search.results.firstCard.title.should('be.visible');
  });

  it('With a keyword and filter in it, the page should load with the filtered results for the keyword', function () {
    const filter = 'message';
    const urlWithFilteredQuery = getUrlWithQuery('god', filter);

    cy.visit(urlWithFilteredQuery);

    const search = SearchPanelFactory.SearchPage();
    search.filters.selectedFilterName.should('eq', filter);
    search.results.firstCard.title.should('be.visible');
  });
});
