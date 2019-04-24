import { RealAlgolia } from '../../Algolia/RealAlgolia';

/**
 * Verifies that the Algolia responses contain what we expect so we know our stubbed responses are accurate.
 */
//TODO convert old Algolia query manager to use this
describe('Tests the response for a keyword contain the expected properties', function () {
  const keywords = ['god', 'lksjd;flakjds'];
  keywords.forEach(keyword => {
    it(`Response for keyword ${keyword} should have keyword, hit count, and pagination information`, function () {
      const responseWrapper = RealAlgolia.fetchResultsForKeyword(keyword);
      cy.wrap({ responseWrapper }).its('responseWrapper.responseReady').should('be.true').then(() => {
        return responseWrapper.responseBody;
      }).then(response => {
        expect(response).to.have.property('query', keyword);
        expect(response).to.have.property('params');

        expect(response).to.have.property('hitsPerPage');
        expect(response).to.have.property('hits').with.property('length').lte(response.hitsPerPage);

        expect(response).to.have.property('nbHits');
        expect(response).to.have.property('nbPages', Math.ceil(response.nbHits / response.hitsPerPage));
      });
    });
  });
});

const standardProperties = ['title', 'category', 'tags', 'description', 'url', 'objectID', 'image']
const contentTypeProperties = {
  page: [],
  message: ['date', 'duration', 'date_timestamp', 'series'],
  series: ['start_date', 'end_date', 'messages', 'date_timestamp'],
  video: ['date', 'duration', 'date_timestamp'],
  article: ['date', 'duration', 'date_timestamp', 'author'],
  episode: ['date', 'duration', 'date_timestamp', 'podcast'],
  song: ['date', 'duration', 'date_timestamp'],
  author: [],
  promo: ['date', 'date_timestamp'],
  location: ['serviceTimes', 'map_url'],
  podcast: ['author', 'children_count'],
  category: [],
  album: ['date', 'duration', 'date_timestamp', 'author'],
}

describe('Tests the responses for each content type have the expected properties', function () {
  Object.keys(contentTypeProperties).forEach(type => {
    it(`Testing ${type} properties`, function () {
      const responseWrapper = RealAlgolia.fetchResultsByContentType(type);
      cy.wrap({ responseWrapper }).its('responseWrapper.responseReady').should('be.true').then(() => {
        const response = responseWrapper.responseBody;

        expect(response).to.have.property('hits').with.property('length').gte('0');
        return response.hits[0];
      }).then(firstHit => {
        expect(firstHit).to.have.property('contentType', type);

        const expectedProperties = standardProperties.concat(contentTypeProperties[type]);
        expectedProperties.forEach(prop => {
          expect(firstHit).to.have.property(prop).and.to.not.be.undefined;
        })
      })
    })
  })
})