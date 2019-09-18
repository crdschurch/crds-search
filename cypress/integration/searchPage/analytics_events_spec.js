import { SearchPanelFactory } from "../../SearchPanel/SearchPanel";


class RequestFilter {
  constructor (cb) {
    this._matching_requests = [];
    this._match_cb = cb;
  }

  get matches() {
    return this._matching_requests;
  }

  keepMatch(request) {
    if (this._match_cb(request)) {
      this._matching_requests.push(request);
    }
  }
}

describe('Tests analytics events are fired', () => {
  let search;
  before(() => {
    cy.visit('/search');
  });

  beforeEach(() => {
    search = SearchPanelFactory.SearchPage();
    cy.server();
  });

  it('checks event triggered on search submit and has expected values', () => {
    const isSearchEvent = (request) => { return request.body.event === 'WebsiteSearch'; }
    const searchEventFilter = new RequestFilter(isSearchEvent);

    cy.route({
      method: 'POST',
      url: 'https://e.metarouter.io/v1/t',
      onRequest: (xhr) => {
        searchEventFilter.keepMatch(xhr.request);
      }
    })

    const searchString = 'g'
    search.clearedSearchField.type(searchString);

    cy.wrap(searchEventFilter).its('matches').should('have.length', 1)


    cy.wrap(searchEventFilter).its('matches').should('have.length', 1).then(matches => {
      cy.wrap(matches[0]).should('have.property', 'body').and('have.property', 'properties').as('eventProperties');

      cy.get('@eventProperties').should('have.property', 'Query', 'g');
      cy.get('@eventProperties').should('have.property', 'ResultsCount').and('be.gt', 0);
    });
  });

  it.only('checks event triggered on search result click', () => {
    const isConversionEvent = (request) => { return request.body.event === 'WebsiteSearchConversion'; }
    const conversionEventFilter = new RequestFilter(isConversionEvent);

    cy.route({
      method: 'POST',
      url: 'https://e.metarouter.io/v1/t',
      onRequest: (xhr) => {
        conversionEventFilter.keepMatch(xhr.request);
      }
    })

    const searchString = 'job'
    search.clearedSearchField.type(searchString).then(() => {
      search.results.firstCard.click(); //TODO use this way to click everywhere
      cy.wrap(conversionEventFilter).its('matches').should('have.length', 1).then(matches => {
        cy.wrap(matches[0]).should('have.property', 'body').and('have.property', 'properties').as('eventProperties');

        cy.get('@eventProperties').should('have.property', 'Query');
        cy.get('@eventProperties').should('have.property', 'Target').and('be.a', 'object');
        cy.get('@eventProperties').should('have.property', 'TargetPosition', 1);
        cy.get('@eventProperties').should('have.property', 'isWidget').and('be.a', 'boolean');
      });
    });
  });
});