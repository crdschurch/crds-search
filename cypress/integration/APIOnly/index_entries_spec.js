import { AlgoliaAPI } from "../../Algolia/AlgoliaAPI";

//Want to make sure certain results are in the index without using the front end

describe('Tests that certain entries exist in the index', function (){
  it('Woman Camp Signup should exist', function (){
    const title = 'Woman Camp Signup'
    AlgoliaAPI.searchByKeyword(title).then(response => {
      expect(response).to.have.property('hits').with.property('length').gte('0');
      return response.hits;
    }).then(results => {
      const match = results.find(r => {
        return r.title === title;
      });
      expect(match.url).to.equal(`${Cypress.config().baseUrl}/womancamp/signup/`);
    })
  })
})