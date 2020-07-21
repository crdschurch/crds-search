import { AlgoliaAPI } from '../../Algolia/AlgoliaAPI';
import { MessageQueryBuilder, SeriesQueryBuilder } from 'crds-cypress-contentful';
import { getRelativeMessageUrl } from '../../support/GetUrl';

/*
* Note: Since we are not modifying entries in Contentful, these tests only passively confirm that the message link is stored correctly in Algolia when either the
* Message or Series slug is updated.
*/
describe('Tests entries with composite urls have correct url', () => {
  it('checks recently updated message', () => {
    const qb = new MessageQueryBuilder();
    qb.orderBy = '-sys.updatedAt';
    qb.select = 'fields.title,fields.slug';
    cy.task('getCNFLResource', qb.queryParams)
    .then((message) => {
      getRelativeMessageUrl(message)
      .then((messageURL) => {

        AlgoliaAPI.searchByKeyword(message.title.text)
        .then(response => {
          expect(response).to.have.property('hits').with.property('length').gte(0);

          const match = response.hits.find(r => r.url.includes(messageURL));
          expect(match).to.not.be.undefined;
        })
      });
    });
  });

  it('checks message on recently updated series', () => {
    const qb = new SeriesQueryBuilder();
    qb.orderBy = '-sys.updatedAt';
    qb.select = 'fields.slug,fields.videos';
    qb.searchBy = 'fields.videos[exist]=true'
    cy.task('getCNFLResource', qb.queryParams)
      .its('videos').as('messages').should('have.length.gte', 1);

    cy.get('@messages')
    .then((messages) => messages[0])
    .then((firstMessage) => {
      AlgoliaAPI.searchByKeyword(firstMessage.title.text)

      .then(response => {
        expect(response).to.have.property('hits').with.property('length').gte(0);

        // firstMessage.getURL()
        getRelativeMessageUrl(firstMessage)
          .then(messageURL => {
            const match = response.hits.find(r => r.url.includes(messageURL));
            expect(match).to.not.be.undefined;
          });
      });
    });
  });
});