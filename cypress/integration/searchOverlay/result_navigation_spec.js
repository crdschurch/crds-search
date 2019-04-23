import { SearchPanelFactory } from '../../support/SearchPanel'
//TODO test this
describe('Given a result indexed from a Page, When that link is clicked, Then the expected page opens:', function () {
  let search;
  beforeEach(function () {
    cy.visit('/firstimpressions');

    //DE6720 - force open the modal
    cy.get('button[data-target="#searchModal"]').first().click({force: true});
    search = SearchPanelFactory.MobileSharedHeaderSearchModal();
  });

  it('Keyword: "Woman Camp Signup" - page requires validation', function () {
    const womanCampSignupUrl = `${Cypress.config().baseUrl}/womancamp/signup/`;

    search.clearedSearchField.type('Woman Camp Signup').then(() => {
      search.resultTitlesByHref(womanCampSignupUrl).first().scrollIntoView().as('womanCampSignupCard');
      cy.get('@womanCampSignupCard').should('exist').and('be.visible');

      cy.get('@womanCampSignupCard').click({ force: true });
      cy.contains('Sign In').should('exist').and('be.visible');
      cy.url().should('eq', `${Cypress.config().baseUrl}/signin`);
    });
  });

  it('Keyword: "Woman Camp" - just an ordinary page', function () {
    const womanCampUrl = `${Cypress.config().baseUrl}/womancamp/`;

    search.clearedSearchField.type('Woman Camp').then(() => {
      search.resultTitlesByHref(womanCampUrl).first().scrollIntoView().as('womanCampCard');
      cy.get('@womanCampCard').should('exist').and('be.visible');

      cy.get('@womanCampCard').first().click();
      cy.url().should('eq', womanCampUrl);
    });
  });

  it('Keyword: "Locker Room" - page excluded from search', function () {
    const lockerRoomUrl = `${Cypress.config().baseUrl}/lockerroom`;
    search.clearedSearchField.type('Locker Room').then(() => {
      search.resultTitlesByHref(lockerRoomUrl).should('not.exist');
    });
  })
})

describe('Given a result indexed from a System Page, When that link is clicked, Then the expected page opens:', function () {
  let search;
  beforeEach(function () {
    cy.visit('/search');
    search = SearchPanelFactory.SearchPage();
  });

  it('Keyword: "Live Streaming" - page lives in crds-net', function () {
    const liveUrl = `${Cypress.config().baseUrl}/live`;

    search.clearedSearchField.type('Live Streaming').then(() => {
      search.resultTitlesByHref(liveUrl).first().scrollIntoView().as('liveStreamingCard');
      cy.get('@liveStreamingCard').should('exist').and('be.visible');

      cy.get('@liveStreamingCard').click();
      cy.get('#recent-message-btn').as('watchMessageButton').should('exist').and('be.visible');
    });
  })

  it('Keyword: "Corkboard" - pages lives in crds-corkboard and is an angular page', function () {
    const corkboardUrl = `${Cypress.config().baseUrl}/corkboard`;

    search.clearedSearchField.type('Corkboard').then(() => {
      search.resultTitlesByHref(corkboardUrl).first().scrollIntoView().as('corkboardCard');
      cy.get('@corkboardCard').should('exist').and('be.visible');

      cy.get('@corkboardCard').click({ force: true });
      cy.get('[href="/corkboard/need"]', { timeout: 20000 }).as('corkboardNeedButton').should('exist').and('be.visible');
    });
  });

  it('Keyword: "Media" - page lives in crds-media and requires a redirect to the media subdomain', function () {
    const mediaURL = `${Cypress.config().baseUrl}/media`;

    search.clearedSearchField.type('Media').then(() => {
      search.resultTitlesByHref(mediaURL).first().scrollIntoView().as('mediaCard');
      cy.get('@mediaCard').should('exist').and('be.visible');

      cy.get('@mediaCard').click();
      cy.get('[data-automation-id="featured-image"').as('featuredImage').should('exist').and('be.visible');
      cy.url().should('contain', mediaURL);
    });
  });
})
