import { SearchPanelFactory } from '../../SearchPanel/SearchPanel'

describe('Tests the expected page opens when result is clicked', () => {
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

  it('checks article result opens the article in /media', () => {
    const mediaPageUrl = `${Cypress.env('CRDS_ENDPOINT')}/media/articles/god-told-me-to-buy-a-bikini`;

    search.clearedSearchField.type('Buy a Bikini');
    search.results.findByHref(mediaPageUrl).title.click({ force: true });
    cy.url().should('eq', mediaPageUrl);
  })

  it('checks result requiring authentication opens /signin', () => {
    const requiresAuthUrl = `${Cypress.env('CRDS_ENDPOINT')}/preschool/register/`;

    search.clearedSearchField.type('Preschool Registration');
    search.results.findByHref(requiresAuthUrl).title.click({ force: true });
    cy.contains('Sign In').should('exist').and('be.visible');
    cy.url().should('eq', `${Cypress.env('CRDS_ENDPOINT')}/signin`);
  })

  it('checks result for page from Contentful opens that page', () => {
    const crdsNetUrl = `${Cypress.env('CRDS_ENDPOINT')}/jobs/`;

    search.clearedSearchField.type('jobs');
    search.results.findByHref(crdsNetUrl).title.click({ force: true });
    cy.url().should('eq', crdsNetUrl);
  })
})