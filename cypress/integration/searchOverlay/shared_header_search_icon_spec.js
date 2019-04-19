describe('lll', function () {
  it('The search overlay should open when the search icon is clicked on the homepage', function (){
    cy.visit('/');

    cy.get('crds-search[id=""] > button[data-target="#searchModal"]').as('searchIcon').click();
//TODO add id to search button to make it unique from mobile
  })
})