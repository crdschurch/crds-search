import { SearchPanelFactory } from '../../support/SearchPanel'

describe('Given a result indexed from a Page, When that link is clicked, Then the expected page opens:', function () {
  let search;
  beforeEach(function () {
    cy.visit('/firstimpressions');

    //DE6720 - force open the modal
    cy.get('button[data-target="#searchModal"]').first().click({ force: true });
    search = SearchPanelFactory.MobileSharedHeaderSearchModal();
  });

  it('Keyword: "Woman Camp Signup" - page requires validation', function () {
    const womanCampSignupUrl = `${Cypress.config().baseUrl}/womancamp/signup/`;

    search.clearedSearchField.type('Woman Camp Signup');
    search.getResultTitlesByHref(womanCampSignupUrl).first().scrollIntoView().as('womanCampSignupCard')
      .should('exist').and('be.visible')
      .click({ force: true });

    cy.contains('Sign In').should('exist').and('be.visible');
    cy.url().should('eq', `${Cypress.config().baseUrl}/signin`);
  });

  it('Keyword: "Woman Camp" - just an ordinary page', function () {
    const womanCampUrl = `${Cypress.config().baseUrl}/womancamp/`;

    search.clearedSearchField.type('Woman Camp');
    search.getResultTitlesByHref(womanCampUrl).first().scrollIntoView().as('womanCampCard')
      .should('exist').and('be.visible')
      .click();

    cy.url().should('eq', womanCampUrl);
  });

  it('Keyword: "Locker Room" - page excluded from search', function () {
    const lockerRoomUrl = `${Cypress.config().baseUrl}/lockerroom`;
    search.clearedSearchField.type('Locker Room').then(() => {
      search.getResultTitlesByHref(lockerRoomUrl).should('not.exist');
    });
  })
})

describe('Given a result indexed from a System Page, When that link is clicked, Then the expected page opens:', function () {
  let search;
  beforeEach(function () {
    cy.visit('/firstimpressions');

    //DE6720 - force open the modal
    cy.get('button[data-target="#searchModal"]').first().click({ force: true });
    search = SearchPanelFactory.MobileSharedHeaderSearchModal();
  });

  it('Keyword: "Live Streaming" - page lives in crds-net', function () {
    const liveUrl = `${Cypress.config().baseUrl}/live`;

    search.clearedSearchField.type('Live Streaming');
    search.getResultTitlesByHref(liveUrl).first().scrollIntoView().as('liveStreamingCard')
      .should('exist').and('be.visible')
      .click();

    cy.get('#recent-message-btn').as('watchMessageButton').should('exist').and('be.visible');
  })

  it('Keyword: "Corkboard" - pages lives in crds-corkboard and is an angular page', function () {
    const corkboardUrl = `${Cypress.config().baseUrl}/corkboard`;

    search.clearedSearchField.type('Corkboard');
    search.getResultTitlesByHref(corkboardUrl).first().scrollIntoView().as('corkboardCard')
      .should('exist').and('be.visible')
      .click({ force: true });

    cy.get('[href="/corkboard/need"]', { timeout: 20000 }).as('corkboardNeedButton').should('exist').and('be.visible');
  });

  it('Keyword: "Media" - page lives in crds-media and requires a redirect to the media subdomain', function () {
    const mediaURL = `${Cypress.config().baseUrl}/media`;

    search.clearedSearchField.type('Media');
    search.getResultTitlesByHref(mediaURL).first().scrollIntoView().as('mediaCard')
      .should('exist').and('be.visible')
      .click({ force: true });

    cy.get('[data-automation-id="featured-image"').as('featuredImage')
      .should('exist').and('be.visible');
    cy.url().should('contain', mediaURL);
  });
})
