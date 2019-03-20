import { SearchBar } from '../../support/SearchBar';

function getUrlWithQuery(keyword, filterLabel = undefined) {
  const encodedKeyword = encodeURI(keyword);
  let url = `${Cypress.config().baseUrl}/?query=${encodedKeyword}`
  if (filterLabel !== undefined) {
    url = `${url}&menu%5BcontentType%5D=${filterLabel}`
  }
  return url;
}

describe('When someone searches:', function () {
  beforeEach(function () {
    cy.visit('/');
  })

  it('For a keyword, the keyword should be included in the url', function () {
    const keyword = 'God';
    const expectedUrl = getUrlWithQuery(keyword);

    SearchBar.enterKeyword(keyword);

    cy.url().should('eq', expectedUrl);
  })

  it('For a keyword a selects filter, the keyword and filter should be included in the url', function () {
    const keyword = 'God';

    SearchBar.enterKeyword(keyword);

    cy.get('.ais-Menu-item').last().as('searchFilter');
    cy.get('@searchFilter').find('.ais-Menu-label').should('have.prop', 'textContent').then(label => {
      cy.get('@searchFilter').click();

      const expectedUrl = getUrlWithQuery(keyword, label);
      cy.url().should('eq', expectedUrl);
    })
  })
});

describe('When someone navigates to a search url:', function () {
  it('With a keyword in it, the page should load with the results for the keyword', function () {
    const urlWithQuery = getUrlWithQuery('god');

    cy.visit(urlWithQuery);

    cy.get('app-hit').first().as('firstResult');
    cy.get('@firstResult').should('be.visible');
  })

  it('With a keyword and filter in it, the page should load with the filtered results for the keyword', function () {
    const filterType = 'message';
    const urlWithFilteredQuery = getUrlWithQuery('god', filterType);

    cy.visit(urlWithFilteredQuery);

    cy.get('app-hit').first().as('firstResult');
    cy.get('@firstResult').should('be.visible');

    cy.get('[class="ais-Menu-item ais-Menu-item--selected"]').as('selectedFilter');
    cy.get('@selectedFilter').find('.ais-Menu-label').should('have.prop', 'textContent').then(label => {
      expect(label).to.be.eq(filterType);
    })
  })
});