import { SearchPanelFactory } from '../../support/SearchPanel'

describe('The Search modal should be displayed when the search icon is clicked:', function () {
  const pagesWithSearchIcon = ['/', '/giving', '/live', '/prayer'];
  pagesWithSearchIcon.forEach(url => {
    it(`From ${url}`, function () {
      cy.ignoreUncaughtException('Uncaught TypeError: Cannot read property \'reload\' of undefined'); //Remove once DE6613 is fixed

      cy.visit(url);

      //TODO replace element selector when data-automation-id "desktop-search" is live in the shared header
      cy.get('crds-search').eq(1).find('button[data-target="#searchModal"]').as('searchIcon').click();

      //DE6720 - When the desktop search icon is clicked, the mobile search modal is what opens
      const search = SearchPanelFactory.MobileSharedHeaderSearchModal();
      search.searchField.should('be.visible');
    });
  });
});