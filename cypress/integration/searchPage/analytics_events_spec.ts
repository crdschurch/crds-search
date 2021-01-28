
describe('Tests analytics events are fired', () => {
const errorsToIgnore = [/.*Script error.*/, /.*uncaught:exception*/, /.*Cannot read property \'replace'\ of undefined*/, /.*Cannot set property 'status' of undefined*/];

  
  beforeEach(() => {
    cy.ignoreMatchingErrors(errorsToIgnore);
    cy.visit('/search');

    cy.server();
    // Re-stub track event to make assertions against it.
    cy.stubAnalyticsTrackEvent('analytics.track');
   });

  it('checks event triggered on search submit and has expected values', () => {
    const searchString = 'group';
    const paginationLimit = 20;

    cy.searchFor(searchString);

    // Verify event called with expected properties
    const queryMatch = Cypress.sinon.match.has('Query', searchString);
    const resultsCountMatch = Cypress.sinon.match.has('ResultsCount', paginationLimit);
    cy.wait(10000);
    cy.get('@analytics.track')
      .should('have.been.calledWithMatch', 'WebsiteSearch', queryMatch.and(resultsCountMatch));
      cy.log('@analytics.track');
  });

  it.skip('checks event triggered on search result click', () => {
    const searchString = 'group';

    cy.searchFor(searchString);
    cy.wait(10000);
    cy.get('.group-title').first().as('firstResultTitle')
      .click();

     
    // Verify event called with expected properties
    const queryMatch = Cypress.sinon.match.has('Query', searchString);
    const targetMatch = Cypress.sinon.match.has('Target', Cypress.sinon.match.object);
    const targetPositionMatch = Cypress.sinon.match.has('TargetPosition', 1);
    const widgetMatch = Cypress.sinon.match.has('isWidget', Cypress.sinon.match.bool);
    cy.wait(20000);
    cy.get('@analytics.track')
      .should('have.been.calledWithMatch',
      'WebsiteSearchConversion',
      queryMatch.and(targetPositionMatch).and(targetMatch).and(widgetMatch));
  });
});
