import { SearchPanelFactory } from '../../support/SearchPanel'

describe('Searching for a keyword returns results, and the expected page opens when a result is clicked', function () {
  let search;
  beforeEach(function () {
    cy.visit('/search');
    search = SearchPanelFactory.SearchPage();
  });

  //Use below for testing the search overlay
  // beforeEach(function () {
  //   cy.visit('/prayer');

  //   //DE6720 - force open the modal
  //   cy.get('button[data-target="#searchModal"]').first().click({ force: true });
  //   search = SearchPanelFactory.MobileSharedHeaderSearchModal();
  // });

  it('Searching for an article opens the article in /media', function () {
    const mediaPageUrl = `${Cypress.config().baseUrl}/media/articles/god-told-me-to-buy-a-bikini`;
    search.clearedSearchField.type('Buy a Bikini');
    search.results.findByHref(mediaPageUrl).title.click({ force: true });
    cy.url().should('eq', mediaPageUrl);
  })

  it('Searching for a page that requires authentication opens /signin', function () {
    const requiresAuthUrl = `${Cypress.config().baseUrl}/preschool/register/`;

    search.clearedSearchField.type('Preschool Registration');
    search.results.findByHref(requiresAuthUrl).title.click({ force: true });
    cy.contains('Sign In').should('exist').and('be.visible');
    cy.url().should('eq', `${Cypress.config().baseUrl}/signin`);
  })

  it('Searching for an ordinary Contentful page on crds.net opens that page', function () {
    const crdsNetUrl = `${Cypress.config().baseUrl}/jobs/`;

    search.clearedSearchField.type('jobs');
    search.results.findByHref(crdsNetUrl).title.click({ force: true });
    cy.url().should('eq', crdsNetUrl);
  })
})