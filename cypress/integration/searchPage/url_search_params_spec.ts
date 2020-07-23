function getUrlWithQuery(keyword: string, filterLabel?: string) {
  const encodedKeyword = encodeURI(keyword);
  let url = `${Cypress.config().baseUrl}/search?query=${encodedKeyword}`;
  if (filterLabel !== undefined) {
    url = `${url}&menu%5BcontentType%5D=${filterLabel}`;
  }
  return url;
}

describe('Tests query params added to url', () => {
  beforeEach(() => {
    cy.visit('/search');
  });

  it('checks keyword added to url', () => {
    const keyword = 'God';
    const expectedUrl = getUrlWithQuery(keyword);

    // Type slowly so url can be updated
    cy.searchFor(keyword, 1000)
      .should('have.prop', 'value', keyword);

    cy.url().should('eq', expectedUrl);
  });

  it('checks keyword and filter added to url', () => {
    const keyword = 'God';
    const filter = 'message';
    const expectedUrl = getUrlWithQuery(keyword, filter);

    cy.searchFor(keyword, 1000)
      .should('have.prop', 'value', keyword);

    cy.contains(filter).as('filter')
      .click({ force: true });

    cy.url().should('eq', expectedUrl);
  });
});

describe('Tests query params in url trigger search automatically', () => {
  it('checks search triggered by keyword', () => {
    const urlWithQuery = getUrlWithQuery('god');

    cy.visit(urlWithQuery);

    cy.get('app-hit .hit-title').first().as('firstResultTitle')
      .should('be.visible');
  });

  it('checks search triggered by keyword and then filtered', () => {
    const filter = 'message';
    const urlWithFilteredQuery = getUrlWithQuery('god', filter);

    cy.visit(urlWithFilteredQuery);

    cy.get('.ais-Menu-item--selected .ais-Menu-label')
      .should('exist')
      .text().should('eq', filter);

    cy.get('app-hit .hit-title').first().as('firstResultTitle')
      .should('be.visible');
  });
});
