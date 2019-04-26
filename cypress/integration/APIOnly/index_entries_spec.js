import { AlgoliaAPI } from "../../Algolia/AlgoliaAPI";

const expectedEntries = [
  {
    title: 'Woman Camp Signup',
    url: `${Cypress.config().baseUrl}/womancamp/signup/`
  },
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
    title: 'Crossroads Media',
    url: `${Cypress.config().baseUrl}/media`
  }
]

describe('Tests that certain entries exist in the index', function () {
  expectedEntries.forEach(entry => {
    it(`${entry.title} should exist`, function () {
      AlgoliaAPI.searchByKeyword(entry.title).then(response => {
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