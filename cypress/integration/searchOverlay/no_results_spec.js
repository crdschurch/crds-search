import { Formatter } from '../../support/Formatter';
import { SearchPanelFactory } from '../../support/SearchPanel';

describe('Concerning searches with no results:', function () {
  let search;
  before(function() {
    cy.visit('/firstimpressions');

    //DE6720 - force open the modal
    cy.get('button[data-target="#searchModal"]').first().click({force: true});
  });

  beforeEach(function () {
    search = SearchPanelFactory.MobileSharedHeaderSearchModal();
  });

  it('When a keyword returns no results, the expected "no results" message is displayed', function () {
    const noResultsKeyword = 'a7'
    search.clearedSearchField.type(noResultsKeyword).then(() => {
      search.noResultsBlock.as('noResultsBlock').should('be.visible');

      //No results text matches
      cy.get('@noResultsBlock').find('[data-automation-id="no-results-message"]').as('noResultsMessage');
      cy.get('@noResultsMessage').should('have.prop', 'textContent').then($elementText => {
        expect(Formatter.normalizeText($elementText)).to.contain(Formatter.normalizeText(`We can't find anything for ${noResultsKeyword}.`));
      });
    });
  });

  it('When a keyword returns no results, links to other pages are displayed', function () {
    const noResultsKeyword = 'a7'
    search.clearedSearchField.type(noResultsKeyword).then(() => {
      search.noResultsBlock.as('noResultsBlock').should('be.visible');

      //Expected urls exist
      cy.get('@noResultsBlock').find('[data-automation-id="no-results-corkboard-link"]').as('corkboardLink');
      cy.get('@corkboardLink').should('be.visible').and('has.attr', 'href').and('contains', `/corkboard`);

      cy.get('@noResultsBlock').find('[data-automation-id="no-results-groups-link"]').as('groupsLink');
      cy.get('@groupsLink').should('be.visible').and('has.attr', 'href').and('contains', `/groups/search`);
    })
  })

  it('When a successful search is made after a no-results search, results are displayed', function () {
    const noResultsKeyword = 'a7'
    search.clearedSearchField.type(noResultsKeyword);

    const resultsKeyword = 'god'
    search.clearedSearchField.type(resultsKeyword).then(() => {
      search.resultList.first().as('firstResult').should('be.visible');
      search.noResultsBlock.should('not.exist');
    });
  });
})