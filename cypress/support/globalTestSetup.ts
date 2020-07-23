/*** Add configuration that must be applied to every test here ***/
/* ex. Stubs for blacklisted hosts */

Cypress.on('window:before:load', (win) => {
  // We've blacklisted the Google Tag Manager host, so we need to stub some of
  //  the methods it provided to avoid errors.
  // To make assertions on the analytics.track event, re-stub it in the test using cy.window().
  (win as WindowExtended).analytics = {
      track: cy.stub()
    };
});
