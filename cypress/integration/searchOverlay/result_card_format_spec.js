import { SearchPanelFactory, ResultCard, TheFilter } from "../../support/SearchPanel";

//Tests the results are formatted by content

describe('Search results can be filtered by type and cards are formatted correctly', function () {
  let search;
  before(function () {
    // cy.visit('/firstimpressions');

    // //DE6720 - force open the modal
    // cy.get('button[data-target="#searchModal"]').first().click({ force: true });
    // search = SearchPanelFactory.MobileSharedHeaderSearchModal();

    //TODO build for /search so can serve locally
    cy.visit('http://localhost:3000/');///search');
    search = SearchPanelFactory.SearchPage();
    search.clearedSearchField.type('God');
    //search.showMoreFilters.click();
  })

  beforeEach(function () {
    SearchPanelFactory.SearchPage();
  })

  it('Tests Page filter and card layout', function () {
    search.getFilterByName('page').click();
    search.selectedFilterLabel.should('have.text', 'page');
    search.resultList.first().as('firstPage');

    const firstCard = new ResultCard('firstPage');
    firstCard.title.should('be.visible').and('have.prop', 'href');
    firstCard.description.should('be.visible');
    firstCard.hitUrl.should('be.visible');
  })

  it('Tests Message filter and card layout', function () {
    search.getFilterByName('message').click();
    search.selectedFilterLabel.should('have.text', 'message');
    search.resultList.first().as('firstMessage');

    const firstCard = new ResultCard('firstMessage');
    firstCard.title.should('be.visible').and('have.prop', 'href');
    firstCard.description.should('be.visible');
    firstCard.series.should('be.visible');
    firstCard.image.should('be.visible');
    firstCard.imageTimestampOverlay.should('be.visible');
    firstCard.date.should('be.visible');
  })

  it('Tests Series filter and card layout', function () {
    search.getFilterByName('series').click();
    search.selectedFilterLabel.should('have.text', 'series');
    search.resultList.first().as('firstSeries');

    const firstCard = new ResultCard('firstSeries');
    firstCard.title.should('be.visible').and('have.prop', 'href');
    firstCard.description.should('be.visible');
    firstCard.image.should('be.visible');
    firstCard.seriesDate.should('be.visible');
  })

  it('Tests Video filter and card layout', function () {
    search.getFilterByName('video').click();
    search.selectedFilterLabel.should('have.text', 'video');
    search.resultList.first().as('firstVideo');

    const firstCard = new ResultCard('firstVideo');
    firstCard.category.should('be.visible');
    firstCard.title.should('be.visible').and('have.prop', 'href');
    firstCard.description.should('be.visible');
    firstCard.image.should('be.visible');
    firstCard.imageTimestampOverlay.should('be.visible');
    firstCard.date.should('be.visible');
  })

  it('Tests Article filter and card layout', function () {
    search.getFilterByName('article').click();
    search.selectedFilterLabel.should('have.text', 'article');
    search.resultList.first().as('firstArticle');

    const firstCard = new ResultCard('firstArticle');
    firstCard.category.should('be.visible');
    firstCard.title.should('be.visible').and('have.prop', 'href');
    firstCard.description.should('be.visible');
    firstCard.author.should('be.visible');
    firstCard.image.should('be.visible');
    firstCard.imageTimestampOverlay.should('be.visible');
    firstCard.date.should('be.visible');
  })

  it('Tests Episode filter and card layout', function () {
    search.getFilterByName('episode').click();
    search.selectedFilterLabel.should('have.text', 'episode');
    search.resultList.first().as('firstEpisode');

    const firstCard = new ResultCard('firstEpisode');
    firstCard.category.should('be.visible');
    firstCard.title.should('be.visible').and('have.prop', 'href');
    firstCard.description.should('be.visible');
    firstCard.image.should('be.visible');
    firstCard.imageTimestampOverlay.should('be.visible');
    firstCard.date.should('be.visible');
  })

  it('Tests Song filter and card layout', function () {
    search.getFilterByName('song').click();
    search.selectedFilterLabel.should('have.text', 'song');
    search.resultList.first().as('firstSong');

    const firstCard = new ResultCard('firstSong');
    firstCard.title.should('be.visible').and('have.prop', 'href');
    firstCard.description.should('be.visible');
    firstCard.image.should('be.visible');
    firstCard.date.should('be.visible');
  })

  it('Tests Promo filter and card layout', function () {
    search.getFilterByName('promo').click();
    search.selectedFilterLabel.should('have.text', 'promo');
    search.resultList.first().as('firstPromo');

    const firstCard = new ResultCard('firstPromo');
    firstCard.title.should('be.visible').and('have.prop', 'href');
    firstCard.description.should('be.visible');
    firstCard.image.should('be.visible');
    firstCard.date.should('be.visible');
    firstCard.hitUrl.should('be.visible');
  })

  it('Tests Author filter and card layout', function () {
    search.getFilterByName('author').click();
    search.selectedFilterLabel.should('have.text', 'author');
    search.resultList.first().as('firstAuthor');

    const firstCard = new ResultCard('firstAuthor');
    firstCard.title.should('be.visible').and('have.prop', 'href');
    firstCard.description.should('be.visible');
    firstCard.image.should('be.visible');
  })
})

//podcast, category
describe('Search results can be filtered by type and cards are formatted correctly (smaller categories)', function () {
  let search;
  beforeEach(function () {
    // cy.visit('/firstimpressions');

    // //DE6720 - force open the modal
    // cy.get('button[data-target="#searchModal"]').first().click({ force: true });
    // search = SearchPanelFactory.MobileSharedHeaderSearchModal();

    //TODO build for /search so can serve locally
    cy.visit('http://localhost:3000/');///search');
    search = SearchPanelFactory.SearchPage();
  })

  it('Tests Album filter and card layout', function () {
    search.clearedSearchField.type('Whatever');
    search.showMoreFilters.click();

    search.getFilterByName('album').click();
    search.selectedFilterLabel.should('have.text', 'album');
    search.resultList.first().as('firstAlbum');

    const firstCard = new ResultCard('firstAlbum');
    firstCard.title.should('be.visible').and('have.prop', 'href');
    firstCard.description.should('be.visible');
    firstCard.image.should('be.visible');
    firstCard.date.should('be.visible');
  })

  it('Tests Location filter and card layout', function () {
    search.clearedSearchField.type('Oakley');
    search.showMoreFilters.click();

    search.getFilterByName('location').click();
    search.selectedFilterLabel.should('have.text', 'location');
    search.resultList.first().as('firstLocation');

    const firstCard = new ResultCard('firstLocation');
    firstCard.title.should('be.visible').and('have.prop', 'href');
    firstCard.description.should('be.visible');
    firstCard.image.should('be.visible');
    firstCard.serviceTimes.should('be.visible');
    firstCard.directionsLink.should('be.visible').and('have.prop', 'href');
  })

  it('Tests Podcast filter and card layout', function () {
    search.clearedSearchField.type('IKR');

    search.getFilterByName('podcast').click();
    search.selectedFilterLabel.should('have.text', 'podcast');
    search.resultList.first().as('firstPodcast');

    const firstCard = new ResultCard('firstPodcast');
    firstCard.title.should('be.visible').and('have.prop', 'href');
    firstCard.description.should('be.visible');
    firstCard.image.should('be.visible');
  })
})