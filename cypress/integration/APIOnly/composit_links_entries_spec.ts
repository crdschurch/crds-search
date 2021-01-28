import { searchAlgolia } from '../../Algolia/AlgoliaAPI';
import { MessageQueryBuilder, SeriesQueryBuilder } from 'crds-cypress-contentful';
import { getRelativeMessageUrl } from '../../support/GetUrl';

/*
* Note: Since we are not modifying entries in Contentful,
*  these tests only passively confirm that the message link is stored correctly in Algolia when either the
* Message or Series slug is updated.
*/
describe.skip('Tests entries with composite urls have correct url', () => {
  it('checks recently updated message', () => {
    const qb = new MessageQueryBuilder();
    qb.orderBy = '-sys.updatedAt';
    qb.select = 'fields.title,fields.slug';
    cy.task<Message>('getCNFLResource', qb.queryParams)
      .then((message) => {
        getRelativeMessageUrl(message)
          .then((messageURL) => {
            searchAlgolia(message.title.text)
              .its('hits').should('have.length.gte', 0)
              .then((hits) => hits.find((r: any) => r.url.includes(messageURL)))
              .its('slug').should('eq', `${Cypress.env('CRDS_ENDPOINT')}/media${messageURL}`);
          });
      });
  });

  it('checks message on recently updated series', () => {
    const qb = new SeriesQueryBuilder();
    qb.orderBy = '-sys.updatedAt';
    qb.select = 'fields.slug,fields.videos';
    qb.searchBy = 'fields.videos[exist]=true';
    cy.task<Series>('getCNFLResource', qb.queryParams)
      .its('videos')
      .should('have.length.gte', 1)
      .then((messages) => {
        const firstMessage: Message = messages[0];
        cy.log(messages[0]);
        getRelativeMessageUrl(firstMessage)
          .then((messageURL) => {
            searchAlgolia(firstMessage.title.text)
              .its('hits').should('have.length.gte', 0)
              .then((hits) => hits.find((r: any) => r.url.includes(messageURL)))
              .its('slug').should('eq', `${Cypress.env('CRDS_ENDPOINT')}/media${messageURL}`);
          });
      });
  });
});

