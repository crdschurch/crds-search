import { SearchPanelFactory } from '../../support/SearchPanel'

describe('The Search modal should be displayed when the search icon is clicked:', function () {
  const pagesWithSearchIcon = ['/', '/giving', '/live'];
  pagesWithSearchIcon.forEach(url => {
    it(`From ${url}`, function () {
      cy.visit(url);

      //TODO replace element selector when shared header PR merged
      cy.get('crds-search').eq(1).find('button[data-target="#searchModal"]').as('searchIcon').click();

      //DE6720 - When the desktop search icon is clicked, the mobile search modal is what opens
      const search = SearchPanelFactory.MobileSharedHeaderSearchModal();
      search.searchField.should('be.visible');
    });
  });
});