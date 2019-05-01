import { SearchPanelFactory } from '../../support/SearchPanel'

describe('Searching for a keyword returns results, and the expected page opens when a result is clicked', function () {
  let search;
  beforeEach(function () {
    cy.visit('/firstimpressions');

    //DE6720 - force open the modal
    cy.get('button[data-target="#searchModal"]').first().click({ force: true });
    search = SearchPanelFactory.MobileSharedHeaderSearchModal();
  });

  it('Searching for an article opens the article in /media', function () {
    const buyABikiniUrl = `${Cypress.config().baseUrl}/media/articles/god-told-me-to-buy-a-bikini`;
    search.clearedSearchField.type('Buy a Bikini');
    search.getResultTitlesByHref(buyABikiniUrl).first().scrollIntoView().as('articleCard')
      .should('exist').and('be.visible')
      .click({ force: true });
    cy.url().should('eq', buyABikiniUrl);
  })

  it('Searching for a page that requires authentication opens /signin', function () {
    const womanCampSignupUrl = `${Cypress.config().baseUrl}/womancamp/signup/`;

    search.clearedSearchField.type('Woman Camp Signup');
    search.getResultTitlesByHref(womanCampSignupUrl).first().scrollIntoView().as('womanCampSignupCard')
      .should('exist').and('be.visible')
      .click({ force: true });

    cy.contains('Sign In').should('exist').and('be.visible');
    cy.url().should('eq', `${Cypress.config().baseUrl}/signin`);
  })

  it('Searching for an ordinary Contentful page on crds.net opens that page', function () {
    const jobsUrl = `${Cypress.config().baseUrl}/jobs/`;

    search.clearedSearchField.type('jobs');
    search.getResultTitlesByHref(jobsUrl).first().scrollIntoView().as('jobsCard')
      .should('exist').and('be.visible')
      .click({ force: true });

    cy.url().should('eq', jobsUrl);
  })
})