import { ContentfulApi } from '../Contentful/ContentfulApi';
import { ContentfulElementValidator as Element } from '../Contentful/ContentfulElementValidator'

function preSearchContentBlockShouldBeDisplayed(contentBlock) {
  cy.get('app-suggested').find('.suggested-container').as('preSearchContentBlock');
  //Element.shouldContainText('preSearchContentBlock', contentBlock.content); //TODO when fixed, test this
  cy.get('@preSearchContentBlock').should('exist').and('contain', 'Popular Results'); //TODO switch this to content block values
}

describe('The pre-search content block should be displayed:', function () {
  let preSearchContentBlock;

  beforeEach(function () {
    const content = new ContentfulApi();
    const contentBlockManager = content.retrieveContentBlockManager();

    cy.visit('/');

    cy.wrap({contentBlockManager}).its('contentBlockManager.contentBlocksReady').should('be.true').then(() => {
      preSearchContentBlock = contentBlockManager.getContentBlockByTitle('suggestedSearch');
    });
  });

  it('Before a search', function () {
    preSearchContentBlockShouldBeDisplayed(preSearchContentBlock);
  });

  it.only('After the search bar is emptied', function () {
    const searchString = 'God'
    cy.get('.ais-SearchBox-input').as('searchField');
    cy.get('@searchField').type(searchString);

    cy.get('.ais-SearchBox-reset').as('clearSearchIcon').click();
    preSearchContentBlockShouldBeDisplayed(preSearchContentBlock);

    cy.get('@searchField').type(searchString);
    cy.get('@searchField').clear();
    preSearchContentBlockShouldBeDisplayed(preSearchContentBlock);
  });
});