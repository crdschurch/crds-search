export class SearchResult {
  static findResultTitleByHref(href, aliasForCard) {
    cy.get(`[class*="hit-title"][href="${href}"]`).as(`${aliasForCard}`);
  }


}