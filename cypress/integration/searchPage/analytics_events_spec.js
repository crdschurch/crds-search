import { SearchPanelFactory } from "../../SearchPanel/SearchPanel";

describe('Tests analytics events are fired', () => {
  let search;
  before(() => {
      cy.visit('/search');
  });

  beforeEach(() => {
    search = SearchPanelFactory.SearchPage();
    cy.server();
    //Re-stub track event to make assertions against it.
    cy.stubAnalyticsTrackEvent('analytics.track');
  });

  it('checks event triggered on search submit and has expected values', () => {
    const searchString = 'g';
    const paginationLimit = 20;
    search.clearedSearchField.type(searchString);

    // Verify event called with expected properties
    const queryMatch = Cypress.sinon.match.has('Query', searchString);
    const resultsCountMatch = Cypress.sinon.match.has('ResultsCount', paginationLimit);
    cy.get('@analytics.track')
      .should('have.been.calledWithMatch', 'WebsiteSearch', queryMatch.and(resultsCountMatch))
  });

  it('checks event triggered on search result click', () => {
    const searchString = 'group';

    search.clearedSearchField.type(searchString)
    .then(() => {      
      search.results.firstCard.click();

      // Verify event called with expected properties
      const queryMatch = Cypress.sinon.match.has('Query', searchString);
      const targetMatch = Cypress.sinon.match.has('Target', Cypress.sinon.match.object);
      const targetPositionMatch = Cypress.sinon.match.has('TargetPosition', 1);
      const widgetMatch = Cypress.sinon.match.has('isWidget', Cypress.sinon.match.bool);
      cy.get('@analytics.track')
       .should('have.been.calledWithMatch', 'WebsiteSearchConversion', queryMatch.and(targetPositionMatch).and(targetMatch).and(widgetMatch));
    });
  });
});