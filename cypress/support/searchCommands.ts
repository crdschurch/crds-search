Cypress.Commands.add('searchFor', (keyword: string, delay: number = 10) => {
  return cy.get('.ais-SearchBox-input').as('searchField')
    .clear()
    .type(keyword, { delay });
});
