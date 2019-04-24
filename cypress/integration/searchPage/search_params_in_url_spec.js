import { SearchPanelFactory } from '../../support/SearchPanel';

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
      cy.url().should('eq', expectedUrl);
    });
  });

  it('For a keyword and selects filter, the keyword and filter should be included in the url', function () {
    const keyword = 'God';
    search.clearedSearchField.type(keyword).then(() => {
      search.filterList.eq(1).as('searchFilter'); //Select the second filter

      cy.get('@searchFilter').find('.ais-Menu-label').should('have.prop', 'textContent').then(label => {
        cy.get('@searchFilter').click();

        const expectedUrl = getUrlWithQuery(keyword, label);
        cy.url().should('eq', expectedUrl);
      });
    });
  });
});

describe('When someone navigates to a search url:', function () {
  it('With a keyword in it, the page should load with the results for the keyword', function () {
    const urlWithQuery = getUrlWithQuery('god');

    cy.visit(urlWithQuery);

    const search = SearchPanelFactory.SearchPage();
    search.resultList.first().as('firstResult').should('be.visible');
  })

  it('With a keyword and filter in it, the page should load with the filtered results for the keyword', function () {
    const filterType = 'message';
    const urlWithFilteredQuery = getUrlWithQuery('god', filterType);

    cy.visit(urlWithFilteredQuery);

    const search = SearchPanelFactory.SearchPage();
    search.resultList.first().as('firstResult').should('be.visible');

    search.selectedFilter.find('.ais-Menu-label').as('selectedFilter').should('have.prop', 'textContent').then(label => {
      expect(label).to.be.eq(filterType);
    })
  })
});