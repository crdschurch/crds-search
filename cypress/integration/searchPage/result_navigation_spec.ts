const errorsToIgnore = [/.*Script error.*/, /.*uncaught:exception*/, /.*Cannot read property \'replace'\ of undefined*/, /.*> Cannot assign to read only property 'process' of object '[object Window]'*/];
describe ('Tests the expected page opens when result is clicked', () => {

  beforeEach(() => {
    cy.ignoreMatchingErrors(errorsToIgnore);
    cy.visit('/search');
  });

  it('checks article result opens the article in /media', () => {
    const mediaPageUrl = `${Cypress.env('CRDS_ENDPOINT')}/media/articles/god-told-me-to-buy-a-bikini`;

    cy.searchFor('bikini', 1000);
    cy.wait(3000);
    cy.get(`[href="${mediaPageUrl}"]`).first()
      .should('be.visible')
      .click();

    cy.url().should('eq', mediaPageUrl);
  });

  it('checks result requiring authentication opens /signin', () => {
    const requiresAuthUrl = `${Cypress.env('CRDS_ENDPOINT')}/profile/personal`;

    cy.searchFor('profile', 1000);

    cy.get(`[href="${requiresAuthUrl}"]`)
      .should('be.visible')
      .click();

    cy.contains('Sign In')
      .should('be.visible');
    cy.url().should('match', new RegExp(`${Cypress.env('CRDS_ENDPOINT')}/signin/?`));
  });

  it('checks result for page from Contentful opens that page', () => {
    const crdsNetUrl = `${Cypress.env('CRDS_ENDPOINT')}/wayfinder-leader-resources/wayfinder-cheat-sheet/`;

    cy.searchFor('wayfinder', 1000);
  //  cy.wait(3000);
    
    cy.get(`[href="${crdsNetUrl}"]`)
      .should('be.visible')
      .click();

    cy.url().should('match', new RegExp(`${crdsNetUrl}`));
  });
});
