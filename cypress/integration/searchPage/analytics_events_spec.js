import { SearchPanelFactory } from "../../SearchPanel/SearchPanel";
import { RequestFilter } from "../../Analytics/RequestFilter";
import { metarouter } from "../../fixtures/event_filters";

const errorsToIgnore = [/.*Cannot set property\W+\w+\W+of undefined.*/];

describe('Tests analytics events are fired', () => {
  let search;
  before(() => {
      cy.ignoreUncaughtException(errorsToIgnore);
      cy.visit('/search');
  });

  beforeEach(() => {
    search = SearchPanelFactory.SearchPage();
    cy.ignoreMatchingErrors(errorsToIgnore);
    cy.server();
  });

  it('checks event triggered on search submit and has expected values', () => {
    const requestFilter = new RequestFilter(metarouter.isSearchEvent);

    cy.route({
      method: 'POST',
      url: 'https://e.metarouter.io/v1/t',
      onRequest: (xhr) => {
        requestFilter.keepMatch(xhr.request);
      }
    })

    const searchString = 'g'
    search.clearedSearchField.type(searchString);

    cy.wrap(requestFilter).its('matches').should('have.length', 1)


    cy.wrap(requestFilter).its('matches').should('have.length', 1).then(matches => {
      cy.wrap(matches[0]).should('have.property', 'body').and('have.property', 'properties').as('eventProperties');

      cy.get('@eventProperties').should('have.property', 'Query', 'g');
      cy.get('@eventProperties').should('have.property', 'ResultsCount').and('be.gt', 0);
    });
  });

  it('checks event triggered on search result click', () => {
    const requestFilter = new RequestFilter(metarouter.isConversionEvent);

    cy.route({
      method: 'POST',
      url: 'https://e.metarouter.io/v1/t',
      onRequest: (xhr) => {
        requestFilter.keepMatch(xhr.request);
      }
    });

    const searchString = 'group'
    search.clearedSearchField.type(searchString).then(() => {
      search.results.firstCard.click();
      cy.wrap(requestFilter).its('matches').should('have.length', 1).then(matches => {
        cy.wrap(matches[0]).should('have.property', 'body').and('have.property', 'properties').as('eventProperties');

        cy.get('@eventProperties').should('have.property', 'Query');
        cy.get('@eventProperties').should('have.property', 'Target').and('be.a', 'object');
        cy.get('@eventProperties').should('have.property', 'TargetPosition', 1);
        cy.get('@eventProperties').should('have.property', 'isWidget').and('be.a', 'boolean');
      });
    });
  });
});