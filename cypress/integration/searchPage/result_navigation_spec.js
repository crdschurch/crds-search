import { SearchBar } from '../../support/SearchBar';

//This returns the card title element, not the card
function findCardTitleByHref(href, aliasForCard) {
  cy.get(`[class*="hit-title"][href="${href}"]`).first().as(`${aliasForCard}`);
  cy.get(`@${aliasForCard}`).scrollIntoView();
}

function shouldNotFindCardWithHref(href) {
  cy.get(`[class*="hit-title"][href="${href}"]`).should('not.exist');
}

describe('Given a result indexed from a Page, When that link is clicked, Then the expected page opens:', function () {
  beforeEach(function () {
    cy.visit('/search');
  });

  it('Keyword: "Woman Camp Signup" - page requires validation', function () {
    const womanCampSignupUrl = `${Cypress.config().baseUrl}/womancamp/signup/`;
    SearchBar.enterKeyword('Woman Camp Signup').then(() => {
      findCardTitleByHref(womanCampSignupUrl, 'womanCampSignupCard');
      cy.get('@womanCampSignupCard').should('exist').and('be.visible');

      cy.get('@womanCampSignupCard').click({ force: true });
      cy.contains('Sign In').should('exist').and('be.visible');
      cy.url().should('eq', `${Cypress.config().baseUrl}/signin`);
    });
  });

  it('Keyword: "Woman Camp" - just an ordinary page', function () {
    const womanCampUrl = `${Cypress.config().baseUrl}/womancamp/`;
    SearchBar.enterKeyword('Woman Camp').then(() => {

      findCardTitleByHref(womanCampUrl, 'womanCampCard');
      cy.get('@womanCampCard').should('exist').and('be.visible');

      cy.get('@womanCampCard').first().click();
      cy.url().should('eq', womanCampUrl);
    });
  });

  it('Keyword: "Locker Room" - page excluded from search', function () {
    const lockerRoomUrl = `${Cypress.config().baseUrl}/lockerroom`;
    SearchBar.enterKeyword('Locker Room').then(() => {
      shouldNotFindCardWithHref(lockerRoomUrl);
    });
  })
})

describe('Given a result indexed from a System Page, When that link is clicked, Then the expected page opens:', function () {
  beforeEach(function () {
    cy.visit('/search');
  });

  it('Keyword: "Live Streaming" - page lives in crds-net', function () {
    const liveUrl = `${Cypress.config().baseUrl}/live`;
    SearchBar.enterKeyword('Live Streaming').then(() => {
      findCardTitleByHref(liveUrl, 'liveStreamingCard');
      cy.get('@liveStreamingCard').should('exist').and('be.visible');

      cy.get('@liveStreamingCard').click();
      cy.get('#recent-message-btn').as('watchMessageButton').should('exist').and('be.visible');
    });
  })

  it('Keyword: "Corkboard" - pages lives in crds-corkboard and is an angular page', function () {
    const corkboardUrl = `${Cypress.config().baseUrl}/corkboard`;
    SearchBar.enterKeyword('Corkboard').then(() => {
      findCardTitleByHref(corkboardUrl, 'corkboardCard');
      cy.get('@corkboardCard').should('exist').and('be.visible');

      cy.get('@corkboardCard').click();
      cy.get('[href="/corkboard/need"]', { timeout: 20000 }).as('corkboardNeedButton').should('exist').and('be.visible');
    });
  });

  it('Keyword: "Media" - page lives in crds-media and requires a redirect to the media subdomain', function () {
    const mediaURL = `${Cypress.config().baseUrl}/media`;
    SearchBar.enterKeyword('Media').then(() => {
      findCardTitleByHref(mediaURL, 'mediaCard');
      cy.get('@mediaCard').should('exist').and('be.visible');

      cy.get('@mediaCard').click();
      cy.get('[data-automation-id="featured-image"').as('featuredImage').should('exist').and('be.visible');
      cy.url().should('contain', mediaURL);
    });
  });
})
