import { ContentfulQueryBuilder, normalizeText } from 'crds-cypress-contentful';

describe.skip('Tests suggested search block', () => {
const errorsToIgnore = [/.*Script error.*/, /.*uncaught:exception*/, /.* > Cannot assign to read only property 'process' of object '[object Window]'*/, /.*> "process" is read-only*/];
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
    let  dag: normalizeText(preSearchContentBlock.content.text);
 //   dag = dag.substring(0, 15);
    let boxdisplay ="box display flex flex wrap wrap box a flex 1 1 160px ";
    boxdisplay = normalizeText(preSearchContentBlock.content.text).split(boxdisplay);
    
    //   cy.log(dag.text().split(boxdisplay));
       cy.log(normalizeText(preSearchContentBlock.content.text).split(boxdisplay));
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
