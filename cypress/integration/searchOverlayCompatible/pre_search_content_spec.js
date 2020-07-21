import { SearchPanelFactory } from '../../SearchPanel/SearchPanel';
import { ContentfulQueryBuilder, normalizeText } from 'crds-cypress-contentful';

describe('Tests suggested search block', () => {
  let preSearchContentBlock;
  let search;
  before(() => {
    const qb = new ContentfulQueryBuilder('content_block');
    qb.select = 'fields.content';
    qb.searchFor ='fields.title=suggestedSearch' 
    cy.task('getCNFLResource', qb.queryParams)
    .then(contentBlock => {
      preSearchContentBlock = contentBlock;
    });
  })

  beforeEach(() => {
    cy.visit('/search');
    search = SearchPanelFactory.SearchPage();
  });

  //Use below for testing the search overlay
  // beforeEach(() => {
  //   cy.visit('/prayer');

  //   //DE6720 - force open the modal
  //   cy.get('button[data-target="#searchModal"]').first().click({ force: true });
  //   search = SearchPanelFactory.MobileSharedHeaderSearchModal();
  // });

  it('checks suggestions displayed before searching', () => {
    search.results.suggestedSearchBlock.as('preSearchContent')
      .should('be.visible')
      .displayedText().should('contain', normalizeText(preSearchContentBlock.content.text));
  });

  it('checks suggestions displayed after search cleared using icon', () => {
    const searchString = 'a'
    search.clearedSearchField.type(searchString).then(() => {
      search.results.firstCard.title.should('be.visible').then(() => {
        search.resetIcon.as('clearSearchIcon').click();

        search.results.suggestedSearchBlock.as('preSearchContent')
          .should('be.visible')
          .displayedText().should('contain', normalizeText(preSearchContentBlock.content.text));
      })
    })
  });

  it('checks suggestions displayed after search cleared manually', () => {
    const searchString = 'a'
    search.searchField.type(searchString).then(() => {
      search.results.firstCard.title.should('be.visible').then(() => {
        search.clearedSearchField.then(() => {
          search.results.suggestedSearchBlock.as('preSearchContent')
            .should('be.visible')
            .displayedText().should('contain', normalizeText(preSearchContentBlock.content.text));
        });
      });
    });
  });
});