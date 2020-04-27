import { SearchPanelFactory } from '../../SearchPanel/SearchPanel';

 const errorsToIgnore = [/.*Cannot set property\W+\w+\W+of undefined.*/, /.*Script error.*/]; 

describe('Tests the expected page opens when result is clicked', () => {
  let search;
  beforeEach(() => {
  const errorsToIgnore = [/.*Cannot set property\W+\w+\W+of undefined.*/];  
  cy.ignoreMatchingErrors(errorsToIgnore);
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
    search.clearedSearchField.type('Bikini').then(() => {
      search.results.findByHref(mediaPageUrl).click();
      cy.url().should('eq', mediaPageUrl);
    });
  })

  it('checks result requiring authentication opens /signin', () => {
    const errorsToIgnore = [/.*Script error.*/];  
    cy.ignoreMatchingErrors(errorsToIgnore);
    const requiresAuthUrl = `${Cypress.env('CRDS_ENDPOINT')}/profile/personal`;

    search.clearedSearchField.type('Profile').then(() => {
    search.results.findByHref(requiresAuthUrl).click();
    cy.contains('Sign In').should('exist').and('be.visible');
    cy.url().should('match', new RegExp(`${Cypress.env('CRDS_ENDPOINT')}/signin/?`));
    });
  })

  it('checks result for page from Contentful opens that page', () => {
    const crdsNetUrl = `${Cypress.env('CRDS_ENDPOINT')}/wayfinder-leader-resources/`;
    search.clearedSearchField.type('wayfinder').then(() => {
      search.results.findByHref(crdsNetUrl, { delay: 2000 }).click();
      cy.url().should('match', new RegExp(`${crdsNetUrl}/?`));
    });
  })
})