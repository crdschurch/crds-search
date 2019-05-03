import { AlgoliaAPI } from '../../Algolia/AlgoliaAPI';

/**
 * Verifies that the Algolia responses contain what we expect so we know our stubbed responses are accurate.
 */
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
  album: ['date', 'duration', 'date_timestamp', 'author'],
  category: []
}

describe('Tests that the responses from the Algilia API have expected properties', function (){
  const keywords = ['god', 'lksjd;flakjds'];
  keywords.forEach(keyword => {

    it(`Response for keyword "${keyword}" should have keyword, hit count, and pagination information`, function () {
      AlgoliaAPI.searchByKeyword(keyword).then(response => {
        expect(response).to.have.property('query', keyword);
        expect(response).to.have.property('params');

        expect(response).to.have.property('hitsPerPage');
        expect(response).to.have.property('hits').with.property('length').lte(response.hitsPerPage);

        expect(response).to.have.property('nbHits');
        expect(response).to.have.property('nbPages', Math.ceil(response.nbHits / response.hitsPerPage));
      });
    });
  });

  const algoliaContentTypes = Object.keys(contentTypeProperties);
  algoliaContentTypes.forEach(type => {
    it(`Responses for content type "${type}" should have expected properties`, function () {
      AlgoliaAPI.searchByContentType(type).then(response => {
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