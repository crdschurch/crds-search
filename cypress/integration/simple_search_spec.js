describe('I do something', function () {
  beforeEach(function(){
    cy.visit('/');
  });

  //TODO need to fix the fixture response
  it('When there is text in the search bar, there should be an icon to clear the field', function() {
    cy.server();
    cy.route('POST', '**/queries?x-algolia-agent**', 'fixture:test_results');
    cy.route('https://cdn.contentful.com/**/entries?sys.id=2l2IrgFvciN84qnwfkMCtI', 'fixture:popular_searches_content_block.json')

    cy.get('.ais-SearchBox-reset').as('clearSearchIcon').should('not.be.visible');
    cy.get('.ais-SearchBox-input').as('searchField').should('have.value', ''); //should be empty

    const searchString = 'crds'
    cy.get('@searchField').type(searchString);
    cy.get('@searchField').should('have.value', searchString);
    cy.get('@clearSearchIcon').should('be.visible');

    cy.get('@clearSearchIcon').click();

    cy.get('@searchField').should('have.value', '');
    cy.get('@clearSearchIcon').should('not.be.visible');
  });
});