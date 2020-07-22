
import { searchAlgolia, searchAlgoliaByContentType } from '../../Algolia/AlgoliaAPI';

/**
 * Verifies that the Algolia responses contain what we expect so we know our stubbed responses are accurate.
 */
const standardProperties = ['title', 'category', 'tags', 'url', 'objectID', 'image'];
const contentTypeProperties = {
  page: [],
  message: ['date', 'duration', 'date_timestamp', 'description', 'series'],
  series: ['start_date', 'end_date', 'messages', 'description', 'date_timestamp'],
  video: ['date', 'duration', 'description', 'date_timestamp'],
  article: ['date', 'duration', 'date_timestamp', 'description', 'author'],
  episode: ['date', 'duration', 'date_timestamp', 'description', 'podcast'],
  song: ['date', 'duration', 'description', 'date_timestamp'],
  author: [],
  promo: ['date', 'description', 'date_timestamp'],
  location: ['serviceTimes', 'description', 'map_url'],
  podcast: ['author', 'description', 'children_count'],
  album: ['date', 'duration', 'date_timestamp', 'description', 'author'],
  category: []
};

describe('Tests properties on Algolia responses', function () {
  const keywords = ['god', 'lksjd;flakjds'];
  keywords.forEach(keyword => {

    describe(`Tests response for keyword "${keyword}"`, () => {
      it(`checks properties for keyword "${keyword}"`, () => {
        searchAlgolia(keyword)
          .then((response) => {
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
      searchAlgoliaByContentType(type)
      .then(response => {
        expect(response).to.have.property('hits').with.property('length').gte(0);
        const firstResponse = response.hits[0];

        expect(firstResponse).to.have.property('contentType', type);

        standardProperties.concat(contentTypeProperties[type]).forEach(prop => {
          expect(firstResponse).to.have.property(prop).and.to.not.be.undefined;
        });
      });
    });
  });
});
