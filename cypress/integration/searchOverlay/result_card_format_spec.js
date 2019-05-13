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
    keyword: 'Whatever',
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

function openPageAndSearchModal() {
  cy.visit('/prayer');

  //DE6720 - force open the modal
  cy.get('button[data-target="#searchModal"]').first().click({ force: true });
  return SearchPanelFactory.MobileSharedHeaderSearchModal();
}

//Reload the whole page to ensure a previous filter is not applied to the results of a new keyword.
// This takes time though, so only do it when necessary.
function searchForKeyword(keywordStatus){
  let search;
  if (keywordStatus.current !== keywordStatus.next) {
    search = openPageAndSearchModal();
    search.clearedSearchField.type(keywordStatus.next);
    keywordStatus.current = keywordStatus.next;
  } else {
    search = SearchPanelFactory.MobileSharedHeaderSearchModal();
  }

  return search;
}

describe('Search results can be filtered by type and cards are formatted correctly', function () {
  const keywordStatus = {
    current: undefined,
    next: undefined
  }

  resultContentSpecs.forEach(type => {
    it(`Tests ${type.filter} filter and card layout`, function () {
      keywordStatus.next = type.keyword;
      const search = searchForKeyword(keywordStatus);

      search.filters.selectFilter(type.filter).then(() => {
        const firstCard = search.results.firstCard;
        type.cardComponents.forEach(content => {
          verifyCardHasComponent(firstCard, content);
        });
      });
    });
  });
});