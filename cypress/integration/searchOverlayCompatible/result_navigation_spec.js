import { SearchPanelFactory } from '../../SearchPanel/SearchPanel'

describe('Searching for a keyword returns results, and the expected page opens when a result is clicked', () => {
  let search;
  beforeEach(() => {
    cy.visit('/search');
    search = SearchPanelFactory.SearchPage();
  });

  //Use below for testing the search overlay
  // beforeEach(() => {
  //   cy.visit('/prayer');

  //   //DE6720 - force open the modal
  //   cy.get('button[data-target="#searchModal"]').first().click({ force: true });
  //   search = SearchPanelFactory.MobileSharedHeaderSearchModal();
  // });

  it('Searching for an article opens the article in /media', () => {
    const mediaPageUrl = `${Cypress.env('CRDS_ENDPOINT')}/media/articles/god-told-me-to-buy-a-bikini`;
    search.clearedSearchField.type('Bikini').then(() => {
      search.results.findByHref(mediaPageUrl).click();
      cy.url().should('eq', mediaPageUrl);
    });
  })

  it('Searching for a page that requires authentication opens /signin', () => {
    const requiresAuthUrl = `${Cypress.env('CRDS_ENDPOINT')}/preschool/register/`;

    search.clearedSearchField.type('Preschool').then(() => {
      search.results.findByHref(requiresAuthUrl).click();
      cy.contains('Sign In').should('exist').and('be.visible');
      cy.url().should('eq', `${Cypress.env('CRDS_ENDPOINT')}/signin`);
    });
  })

  it('Searching for an ordinary Contentful page on crds.net opens that page', () => {
    const crdsNetUrl = `${Cypress.env('CRDS_ENDPOINT')}/jobs/`;

    search.clearedSearchField.type('jobs').then(() => {
      search.results.findByHref(crdsNetUrl).click();
      cy.url().should('eq', crdsNetUrl);
    });
  })
})