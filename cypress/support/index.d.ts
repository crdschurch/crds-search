// in cypress/support/index.d.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
      /**
       * Ignore a list of matching errors
       * @example cy.ignoreMatchingErrors([/.+Cannot set property\W+\w+\W+of undefined.+/])
      */
     ignoreMatchingErrors(errorList: RegExp[]): void;
     
     displayedText(): Chainable<Element>;

     text(): Chainable<Element>;

     stubAnalyticsTrackEvent(aliasName: string): void;

     searchFor(keyword: string, delay?: number): Chainable<Element>;
    }
  }