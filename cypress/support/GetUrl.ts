import { SeriesQueryBuilder } from 'crds-cypress-contentful';

/**
 * Returns a Cypress promise with the message's relative url
 * @param {any} message must have fields.slug
 */
export function getRelativeMessageUrl(message: Message) {
  const qb = new SeriesQueryBuilder();
  qb.searchFor = `links_to_entry=${message.sys_id}`;
  qb.select = 'fields.slug';
  qb.orderBy = '-fields.published_at';
  qb.limit = 1;

  return cy.task<Series>('getCNFLResource', qb.queryParams)
    .then((series) => {
      const seriesComponent = series.isPublished ? `/series/${series.slug.text}` : '';
      const messageUrl = seriesComponent + `/${message.slug.text}`;
      return messageUrl;
    });
}
