import { AlgoliaAPI } from "../../Algolia/AlgoliaAPI";

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

describe('Tests these entries exist in the index', function () {
  expectedEntries.forEach(entry => {
    it(`"${entry.title}" should be searchable`, function () {
      AlgoliaAPI.searchByKeyword(entry.title, true).then(response => {
        expect(response).to.have.property('hits').with.property('length').gte('0');

        const match = response.hits.find(r => r.title === entry.title);
        expect(match.url).to.equal(entry.url);
      })
    })
  })
})


const notSearchableContent = [
  {
    title: 'Locker Room',
    url: `${Cypress.env('CRDS_ENDPOINT')}/lockerroom`
  }
]

describe('Tests these entries are not in the index', function (){
  notSearchableContent.forEach(entry => {
    it(`"${entry.title}" should not be searchable`, function () {
      AlgoliaAPI.searchByKeyword(entry.title, true).then(response => {
        expect(response).to.have.property('hits').with.property('length').gte('0');

        const match = response.hits.find(r => r.title === entry.title);
        expect(match).to.be.undefined;
      })
    })
  })
})