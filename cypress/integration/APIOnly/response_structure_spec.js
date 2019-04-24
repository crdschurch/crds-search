import algoliasearch from 'algoliasearch';
import { AlgoliaApi } from '../../Algolia/AlgoliaApi';
import { RealAlgolia } from '../../Algolia/RealAlgolia';

/**
 * Verifies that the Algolia responses contain what we expect so we know our stubbed responses are accurate.
 */

describe('Tests the responses from Algolia contain what we expect', function () {
  const keyword = 'god'; //TODO use different keywords -
  let response;
  before(function () {
    const responseWrapper = RealAlgolia.getQueryResponse(keyword);
    return cy.wrap({responseWrapper}).its('responseWrapper.responseReady').should('be.true').then(() =>{
      response = responseWrapper.responseBody;
    });
  });

  it('Response should have keyword, hit count, and pagination information', function () {
    expect(response).to.have.property('query', keyword);
    expect(response).to.have.property('params');

    expect(response).to.have.property('hitsPerPage');
    expect(response).to.have.property('hits').with.property('length').lte(response.hitsPerPage);

    expect(response).to.have.property('nbHits');
    expect(response).to.have.property('nbPages', Math.ceil(response.nbHits / response.hitsPerPage));
  });

  it('Hits should have...', function () {
    //TODO what should this have?
  })
});