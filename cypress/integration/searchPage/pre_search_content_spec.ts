import { ContentfulQueryBuilder, normalizeText } from 'crds-cypress-contentful';
const errorToIgnore = [/.*Script error.*/, /.*uncaught:exception*/, /.*Cannot read property \'replace'\ of undefined*/, /.*> Cannot assign to read only property 'process' of object '[object Window]'*/];
describe.skip('Tests suggested search block', () => {
  let preSearchContentBlock: ContentBlock;
  before(() => {
    const qb = new ContentfulQueryBuilder('content_block');
    qb.select = 'fields.content';
    qb.searchFor = 'fields.title=suggestedSearch';
    cy.task<ContentBlock>('getCNFLResource', qb.queryParams)
      .then((contentBlock) => {
        preSearchContentBlock = contentBlock;
      });
  });

  beforeEach(() => {
    cy.ignoreMatchingErrors(errorToIgnore);
    cy.visit('/search');
  });

  it('checks suggestions displayed before searching', () => {
    cy.get('.suggested-container')
      .as('preSearchContent')
      .should('be.visible')
      .displayedText()
      .should('contain', normalizeText(preSearchContentBlock.content.text));
  });

  it('checks suggestions displayed after search cleared using icon', () => {
    const searchString = 'a';

    cy.searchFor(searchString);

    cy.get('.hit-title').first().as('firstResultTitle')
      .should('be.visible');

    cy.get('.ais-SearchBox-reset').as('clearSearchIcon')
      .click();

    cy.get('.suggested-container')
      .as('preSearchContent')
      .should('be.visible')
      .displayedText()
      .should('contain', normalizeText(preSearchContentBlock.content.text));
  });

  it('checks suggestions displayed after search cleared manually', () => {
    const searchString = 'a';

    cy.searchFor(searchString);

    cy.get('.hit-title').first().as('firstResultTitle')
      .should('be.visible');

    cy.get('@searchField')
      .clear();

    cy.get('.suggested-container')
      .as('preSearchContent')
      .should('be.visible')
      .displayedText()
      .should('contain', normalizeText(preSearchContentBlock.content.text));
  });
});