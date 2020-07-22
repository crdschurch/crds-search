describe('Tests the expected page opens when result is clicked', () => {
  beforeEach(() => {
    cy.visit('/search');
  });

  it('checks article result opens the article in /media', () => {
    const mediaPageUrl = `${Cypress.env('CRDS_ENDPOINT')}/media/articles/god-told-me-to-buy-a-bikini`;

    cy.searchFor('bikini');

    cy.get(`[class*="hit-title"][href="${mediaPageUrl}"]`)
      .should('be.visible')
      .click();

    cy.url().should('eq', mediaPageUrl);
  });

  it('checks result requiring authentication opens /signin', () => {
    const requiresAuthUrl = `${Cypress.env('CRDS_ENDPOINT')}/profile/personal`;

    cy.searchFor('profile', 1000);

    cy.get(`[class*="hit-title"][href="${requiresAuthUrl}"]`)
      .should('be.visible')
      .click();

    cy.contains('Sign In')
      .should('be.visible');
    cy.url().should('match', new RegExp(`${Cypress.env('CRDS_ENDPOINT')}/signin/?`));
  });

  it('checks result for page from Contentful opens that page', () => {
    const crdsNetUrl = `${Cypress.env('CRDS_ENDPOINT')}/wayfinder-leader-resources/`;

    cy.searchFor('wayfinder');

    cy.get(`[class*="hit-title"][href="${crdsNetUrl}"]`)
      .should('be.visible')
      .click();

    cy.url().should('match', new RegExp(`${crdsNetUrl}/?`));
  });
});
