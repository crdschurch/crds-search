import { AlgoliaAPI } from "../../Algolia/AlgoliaAPI";

const expectedEntries = [
  {
    title: 'Woman Camp',
    url: `${Cypress.config().baseUrl}/womancamp/`
  },
  {
    title: 'Live Streaming',
    url: `${Cypress.config().baseUrl}/live`
  },
  {
    title: 'Corkboard',
    url: `${Cypress.config().baseUrl}/corkboard`
  },
  {
    title: 'Media',
    url: `${Cypress.config().baseUrl}/media`
  }
]

describe('Tests these entries exist in the index', function () {
  expectedEntries.forEach(entry => {
    it(`"${entry.title}" should be searchable`, function () {
      AlgoliaAPI.searchByKeyword(entry.title, true).then(response => {
        expect(response).to.have.property('hits').with.property('length').gte('0');
        return response.hits;
      }).then(results => {
        const match = results.find(r => {
          return r.title === entry.title;
        });
        expect(match.url).to.equal(entry.url);
      })
    })
  })
})


const notSearchableContent = [
  {
    title: 'Locker Room',
    url: `${Cypress.config().baseUrl}/lockerroom`
  }
]

describe('Tests these entries are not in the index', function (){
  notSearchableContent.forEach(entry => {
    it(`"${entry.title}" should not be searchable`, function () {
      AlgoliaAPI.searchByKeyword(entry.title, true).then(response => {
        expect(response).to.have.property('hits').with.property('length').gte('0');
        return response.hits;
      }).then(results => {
        const match = results.find(r => {
          return r.title === entry.title;
        });
        expect(match).to.be.undefined;
      })
    })
  })
})