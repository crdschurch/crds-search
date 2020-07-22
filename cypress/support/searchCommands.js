Cypress.Commands.add("searchFor", (keyword, delay = 10) => {
  return cy.get('.ais-SearchBox-input').as('searchField')
    .clear()
    .type(keyword, { delay });
});