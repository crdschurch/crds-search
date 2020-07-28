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
     
     displayedText(): Chainable<string>;

     text(): Chainable<string>;

     stubAnalyticsTrackEvent(aliasName: string): void;

     searchFor(keyword: string, delay?: number): Chainable<Element>;

     // Declare task output type so chained values can be type checked correctly 
     task<T>(event: string, arg?: any, options?: Partial<Loggable & Timeoutable>): Chainable<T>
    }
  }

declare module 'crds-cypress-contentful';