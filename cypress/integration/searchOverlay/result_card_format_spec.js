import { SearchPanelFactory, ResultCard } from "../../support/SearchPanel";

//Tests the results are formatted by content
const resultContentSpecs = [
  {
    keyword: 'God',
    filter: 'page',
    cardComponents: ['title', 'description', 'hitUrl']
  },
  {
    keyword: 'God',
    filter: 'message',
    cardComponents: ['title', 'description', 'image', 'imageTimestampOverlay', 'date', 'series']
  },
  {
    keyword: 'God',
    filter: 'series',
    cardComponents: ['title', 'description', 'image', 'seriesDate']
  },
  {
    keyword: 'God',
    filter: 'video',
    cardComponents: ['title', 'description', 'image', 'imageTimestampOverlay', 'date', 'category']
  },
  {
    keyword: 'God',
    filter: 'article',
    cardComponents: ['title', 'description', 'image', 'imageTimestampOverlay', 'date', 'category', 'author']
  },
  {
    keyword: 'God',
    filter: 'episode',
    cardComponents: ['title', 'description', 'image', 'imageTimestampOverlay', 'date', 'category']
  },
  {
    keyword: 'God',
    filter: 'song',
    cardComponents: ['title', 'description', 'image', 'date']
  },
  {
    keyword: 'God',
    filter: 'promo',
    cardComponents: ['title', 'description', 'image', 'date', 'hitUrl']
  },
  {
    keyword: 'God',
    filter: 'author',
    cardComponents: ['title', 'description', 'image']
  },
  {
    keyword: 'Wherever',
    filter: 'album',
    cardComponents: ['title', 'description', 'image', 'date']
  },
  {
    keyword: 'Oakley',
    filter: 'location',
    cardComponents: ['title', 'description', 'image', 'serviceTimes', 'directionsLink']
  },
  {
    keyword: 'IKR',
    filter: 'podcast',
    cardComponents: ['title', 'description', 'image']
  }
]

const card = [{
  keyword: 'Wherever',
  filter: 'album',
  cardComponents: ['title', 'description', 'image', 'date']
}]

function verifyCardHasComponent(resultCard, component) {
  switch (component) {
    case 'title':
      resultCard.title.should('be.visible').and('have.prop', 'href');
      break;
    case 'description':
      resultCard.description.should('be.visible');
      break;
    case 'hitUrl':
      resultCard.hitUrl.should('be.visible');
      break;
    case 'image':
      resultCard.image.should('be.visible');
      break;
    case 'imageTimestampOverlay':
      resultCard.imageTimestampOverlay.should('be.visible');
      break;
    case 'date':
      resultCard.date.should('be.visible');
      break;
    case 'series':
      resultCard.series.should('be.visible');
      break;
    case 'seriesDate':
      resultCard.seriesDate.should('be.visible');
      break;
    case 'category':
      resultCard.category.should('be.visible');
      break;
    case 'author':
      resultCard.author.should('be.visible');
      break;
    case 'serviceTimes':
      resultCard.serviceTimes.should('be.visible');
      break;
    case 'directionsLink':
      resultCard.directionsLink.should('be.visible');
      break;
    default:
      throw new Error(`Display validation for content "${component}" does not exist yet.`);
  }
}



describe('Search results can be filtered by type and cards are formatted correctly', function () {
  let search;
  let currentKeyword;
  before(function () {
    // cy.visit('/prayer');

    // //DE6720 - force open the modal
    // cy.get('button[data-target="#searchModal"]').first().click({ force: true });


    //TODO build for /search so can serve locally
    cy.visit('http://localhost:3000/');///search');
  })

  beforeEach(function () {
    search = SearchPanelFactory.SearchPage();
    // search = SearchPanelFactory.MobileSharedHeaderSearchModal();
  })

  resultContentSpecs.forEach(type => {
    it(`Tests ${type.filter} filter and card layout`, function () {
      if (currentKeyword !== type.keyword) {
        cy.visit('http://localhost:3000/'); //TODO remove before merge - not needed for modal
        search.clearedSearchField.type(type.keyword);
        currentKeyword = type.keyword;
      }

      search.filters.selectFilter(type.filter).then(() => {
        const firstCard = search.results.firstCard;
        type.cardComponents.forEach(content => {
          verifyCardHasComponent(firstCard, content);
        });
      });
    });
  });
});