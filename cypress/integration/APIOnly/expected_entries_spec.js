import { searchAlgolia } from "../../Algolia/AlgoliaAPI";

const expectedEntries = [
  {
    title: 'Woman Camp',
    url: `${Cypress.env('CRDS_ENDPOINT')}/womancamp/`
  },
  {
    title: 'Live Streaming',
    url: `${Cypress.env('CRDS_ENDPOINT')}/live`
  },
  {
    title: 'Corkboard',
    url: `${Cypress.env('CRDS_ENDPOINT')}/corkboard`
  },
  {
    title: 'Media',
    url: `${Cypress.env('CRDS_ENDPOINT')}/media`
  }
]

describe('Tests these entries should be in the index', () => {
  expectedEntries.forEach(entry => {
    it(`checks "${entry.title}" exists`, () => {
      searchAlgolia(entry.title, true).then(response => {
        expect(response).to.have.property('hits').with.property('length').gte(0);

        const match = response.hits.find(r => r.title === entry.title);
        expect(match.url).to.equal(entry.url);
      })
    })
  })
})

describe('Tests entries should not be in the index', function () {
  it(`checks "Locker Room" does not exist`, () => {
    const title = 'Locker Room';
    searchAlgolia(title, true).then(response => {
      expect(response).to.have.property('hits').with.property('length').gte(0);

      const match = response.hits.find(r => r.title === title);
      expect(match).to.be.undefined;
    })
  })
})