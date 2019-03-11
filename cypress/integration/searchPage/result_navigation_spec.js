import { SearchBar } from '../../support/SearchBar';

//This returns the card title element, not the card
function findCardTitleByHref(href, aliasForCard) {
  cy.get(`[class*="hit-title"][href="${href}"]`).as(`${aliasForCard}`);
}

function shouldNotFindCardWithHref(href) {
  cy.get(`[class*="hit-title"][href="${href}"]`).should('not.exist');
}

//If we need this anywhere else, move this to Support
function getMediaBaseUrl() {
  let env = /int|demo/g.exec(`${Cypress.env('CRDS_BASE_URL')}`);
  env = env === null ? '' : env[0];
  return `https://media${env}.crossroads.net`;
}

describe('Given a result indexed from a Page, When that link is clicked, Then the expected page opens:', function () {
  beforeEach(function () {
    cy.visit('/');
  });

  it('Keyword: "Woman Camp Signup" - page requires validation', function () {
    const womanCampSignupUrl = `${Cypress.env('CRDS_BASE_URL')}/womancamp/signup/`;
    SearchBar.enterKeyword('Woman Camp Signup');

    findCardTitleByHref(womanCampSignupUrl, 'womanCampSignupCard');
    cy.get('@womanCampSignupCard').should('exist').and('be.visible');

    cy.get('@womanCampSignupCard').click();
    cy.contains('Sign In').should('exist').and('be.visible');
    cy.url().should('eq', `${Cypress.env('CRDS_BASE_URL')}/signin`);
  });

  it('Keyword: "Woman Camp" - just an ordinary page', function () {
    const womanCampUrl = `${Cypress.env('CRDS_BASE_URL')}/womancamp/`;
    SearchBar.enterKeyword('Woman Camp');

    findCardTitleByHref(womanCampUrl, 'womanCampCard');
    cy.get('@womanCampCard').should('exist').and('be.visible');

    cy.get('@womanCampCard').first().click();
    cy.url().should('eq', womanCampUrl);
  });

  it('Keyword: "Locker Room" - page excluded from search', function () {
    const lockerRoomUrl = `${Cypress.env('CRDS_BASE_URL')}/lockerroom`;
    SearchBar.enterKeyword('Locker Room');

    shouldNotFindCardWithHref(lockerRoomUrl);
  })
})

describe('Given a result indexed from a System Page, When that link is clicked, Then the expected page opens:', function () {
  beforeEach(function () {
    cy.visit('/');
  });

  it('Keyword: "Live Streaming" - page lives in crds-net', function () {
    const liveUrl = `${Cypress.env('CRDS_BASE_URL')}/live`;
    SearchBar.enterKeyword('Live Streaming');

    findCardTitleByHref(liveUrl, 'liveStreamingCard');
    cy.get('@liveStreamingCard').should('exist').and('be.visible');

    cy.get('@liveStreamingCard').click();
    cy.get('#recent-message-btn').as('watchMessageButton').should('exist').and('be.visible');
  })

  it('Keyword: "Corkboard" - pages lives in crds-corkboard and is an angular page', function () {
    const corkboardUrl = `${Cypress.env('CRDS_BASE_URL')}/corkboard`;
    SearchBar.enterKeyword('Corkboard');

    findCardTitleByHref(corkboardUrl, 'corkboardCard');
    cy.get('@corkboardCard').should('exist').and('be.visible');

    cy.get('@corkboardCard').click();
    cy.get('[href="/corkboard/need"]', { timeout: 20000 }).as('corkboardNeedButton').should('exist').and('be.visible');
  });

  it('Keyword: "Media" - page lives in crds-media and requires a redirect to the media subdomain', function () {
    const indexedMediaUrl = `${Cypress.env('CRDS_BASE_URL')}/media`;
    const actualMediaUrl = getMediaBaseUrl();
    SearchBar.enterKeyword('Media');

    findCardTitleByHref(indexedMediaUrl, 'mediaCard');
    cy.get('@mediaCard').should('exist').and('be.visible');

    cy.get('@mediaCard').click();
    cy.get('[data-automation-id="featured-image"').as('featuredImage').should('exist').and('be.visible');
    cy.url().should('contain', actualMediaUrl);
  });
})
