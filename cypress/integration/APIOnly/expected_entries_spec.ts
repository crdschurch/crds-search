import { searchAlgolia } from '../../Algolia/AlgoliaAPI';

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
];

describe('Tests these entries should be in the index', () => {
  expectedEntries.forEach(entry => {
    it(`checks "${entry.title}" exists`, () => {
      searchAlgolia(entry.title, true)
        .its('hits')
        .should('have.length.gte', 0)
        .then((hits) => hits.find((r: any) => r.title === entry.title))
        .its('url').should('eq', entry.url);
    });
  });
});

describe('Tests entries should not be in the index', function () {
  it(`checks "Locker Room" does not exist`, () => {
    const title = 'Locker Room';
    searchAlgolia(title, true)
      .its('hits')
      .should('have.length.gte', 0)
      .then((hits) => {
        const match = hits.find((r: any) => r.title === title);
        expect(match).to.be.undefined;
      });
  });
});
