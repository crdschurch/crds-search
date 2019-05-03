import { Formatter } from '../../support/Formatter';
import { SearchPanelFactory } from '../../support/SearchPanel';

describe('Concerning searches with no results:', function () {
  let search;
  before(function () {
    cy.visit('/prayer');

    //DE6720 - force open the modal
    cy.get('button[data-target="#searchModal"]').first().click({ force: true });
  });

  beforeEach(function () {
    search = SearchPanelFactory.MobileSharedHeaderSearchModal();
  });

  it.only('When a keyword returns no results, the expected "no results" message is displayed', function () {
    const noResultsKeyword = 'a7'
    search.clearedSearchField.type(noResultsKeyword).then(() => {
      search.results.noResultsBlock.as('noResultsBlock').should('be.visible')
        .find('[data-automation-id="no-results-message"]').as('noResultsMessage');

      cy.get('@noResultsMessage').text().should('eq', `We can't find anything for ${noResultsKeyword}.`);
    });
  });

  it('When a keyword returns no results, links to other pages are displayed', function () {
    const noResultsKeyword = 'a7'
    search.clearedSearchField.type(noResultsKeyword).then(() => {
      search.results.noResultsBlock.as('noResultsBlock').should('be.visible');

      //Expected urls exist
      cy.get('@noResultsBlock').find('[data-automation-id="no-results-corkboard-link"]').as('corkboardLink');
      cy.get('@corkboardLink').should('be.visible').and('has.attr', 'href').and('contains', `/corkboard`);

      cy.get('@noResultsBlock').find('[data-automation-id="no-results-groups-link"]').as('groupsLink');
      cy.get('@groupsLink').should('be.visible').and('has.attr', 'href').and('contains', `/groups/search`);
    });
  });

  it('When a successful search is made after a no-results search, results are displayed', function () {
    const noResultsKeyword = 'a7'
    search.clearedSearchField.type(noResultsKeyword);

    const resultsKeyword = 'god'
    search.clearedSearchField.type(resultsKeyword).then(() => {
      search.results.firstCard.title.should('be.visible');
      search.results.noResultsBlock.should('not.exist');
    });
  });
});