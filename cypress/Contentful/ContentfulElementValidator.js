import { Formatter } from '../support/Formatter';

//handles required/not required when verifying content elements
export class ContentfulElementValidator {
  static shouldContainText(alias, textFieldObject) {
    if (textFieldObject.isRequiredOrHasContent) {
      cy.get(`@${alias}`).should('be.visible');
      cy.get(`@${alias}`).should('have.prop', 'textContent').then($elementText => {
        expect(Formatter.normalizeText($elementText)).to.contain(textFieldObject.normalized);
      });
    }
  }
}