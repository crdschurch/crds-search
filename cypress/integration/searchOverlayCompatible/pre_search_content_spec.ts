import { ContentfulQueryBuilder, normalizeText } from 'crds-cypress-contentful';

describe('Tests suggested search block', () => {
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

    cy.get('app-hit .hit-title').first().scrollIntoView().as('firstResultTitle')
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

    cy.get('app-hit .hit-title').first().scrollIntoView().as('firstResultTitle')
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
