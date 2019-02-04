import { ContentfulElementValidator as Element } from '../Contentful/ContentfulElementValidator'
import { ContentBlockManager } from '../Contentful/Models/ContentBlockModel';

function preSearchContentBlockShouldBeDisplayed(contentBlock) {
  cy.get('app-suggested').find('.suggested-container').as('preSearchContentBlock');
  Element.shouldContainText('preSearchContentBlock', contentBlock.content);
}

describe('The pre-search content block should be displayed:', function () {
  let preSearchContentBlock;

  beforeEach(function () {
    cy.visit('/');

    const cbm = new ContentBlockManager()
    cbm.saveContentBlockByTitle('suggestedSearch');
    cy.wrap({ cbm }).its("cbm.suggestedSearch").should('exist').then(() => {
      preSearchContentBlock = cbm['suggestedSearch'];
    });
  });

  it('Before a search', function () {
    preSearchContentBlockShouldBeDisplayed(preSearchContentBlock);
  });

  it('After the search bar is cleared using the icon or manually', function () {
    const searchString = 'a'
    cy.get('.ais-SearchBox-input').as('searchField');
    cy.get('@searchField').type(searchString);

    cy.get('.ais-SearchBox-reset').as('clearSearchIcon').click();
    preSearchContentBlockShouldBeDisplayed(preSearchContentBlock);

    cy.get('@searchField').type(searchString);
    cy.get('@searchField').clear();
    preSearchContentBlockShouldBeDisplayed(preSearchContentBlock);
  });
});