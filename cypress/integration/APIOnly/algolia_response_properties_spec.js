  
import { AlgoliaAPI } from '../../Algolia/AlgoliaAPI';

/**
 * Verifies that the Algolia responses contain what we expect so we know our stubbed responses are accurate.
 */
const standardProperties = ['title', 'tags', 'url', 'objectID']
const contentTypeProperties = {
  page: [],
  message: ['category','date', 'duration', 'date_timestamp', 'description','series', 'image'],
  series: ['start_date', 'date', 'description','date_timestamp', 'image'],
  video: ['category','date', 'duration', 'date_timestamp', 'image'],
  article: ['category','date', 'duration', 'date_timestamp', 'description', 'author', 'image'],
  episode: ['date', 'date_timestamp', 'description', 'podcast', 'image'],
  song: ['date', 'duration', 'description','date_timestamp', 'image'],
  author: ['description','date_timestamp', 'image'],
  promo: ['date', 'description', 'date_timestamp', 'image'],
  location: ['serviceTimes', 'description', 'map_url', 'image'],
  podcast: ['author', 'description','children_count'],
  album: ['date', 'duration', 'date_timestamp', 'description'],
  category: ['image']
}

describe('Tests properties on Algolia responses', function (){
  const keywords = ['god', 'lksjd;flakjds'];
  keywords.forEach(keyword => {

    describe(`Tests response for keyword "${keyword}"`, () => {
      it(`checks properties for keyword "${keyword}"`, () => {
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
  });

  const algoliaContentTypes = Object.keys(contentTypeProperties);
  algoliaContentTypes.forEach(type => {

    it(`checks properties for type "${type}"`, () => {
      AlgoliaAPI.searchByContentType(type).then(response => {
        expect(response).to.have.property('hits').with.property('length').gte('0');
        const firstResponse = response.hits[0];

        expect(firstResponse).to.have.property('contentType', type);

        standardProperties.concat(contentTypeProperties[type]).forEach(prop => {
          expect(firstResponse).to.have.property(prop).and.to.not.be.undefined;
        })
      })
    })
  })
})