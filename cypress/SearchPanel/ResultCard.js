export class ResultCard {
  constructor (cardAlias) {
    this._cardAlias = cardAlias;
  }

  click() {
    // Click on title, not app-hit, so events are fired and page navigates
    this.title.click({force: true});
  }

  get image() {
    return cy.get(`@${this._cardAlias}`).find('.hit-img');
  }

  get imageTimestampOverlay() {
    return this.image.should('exist').find('.card-stamp');
  }

  get category() {
    return cy.get(`@${this._cardAlias}`).find('[data-automation-id="hit-category"]');
  }

  get title() {
    return cy.get(`@${this._cardAlias}`).find('.hit-title');
  }

  get description() {
    return cy.get(`@${this._cardAlias}`).find('[data-automation-id="hit-description"]');
  }

  get author() {
    return cy.get(`@${this._cardAlias}`).find('.hit-author');
  }

  get date() {
    return cy.get(`@${this._cardAlias}`).find('.hit-date');
  }

  get seriesDate() {
    return cy.get(`@${this._cardAlias}`).find('.hit-series-date');
  }

  get hitUrl() {
    return cy.get(`@${this._cardAlias}`).find('.hit-url');
  }

  get series() {
    return cy.get(`@${this._cardAlias}`).find('.hit-series');
  }

  get serviceTimes() {
    return cy.get(`@${this._cardAlias}`).find('[data-automation-id="hit-serviceTimes"]');
  }

  get directionsLink() {
    return cy.get(`@${this._cardAlias}`).find('[data-automation-id="hit-directions"]');
  }
}
