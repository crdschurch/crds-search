import { TestBed } from '@angular/core/testing';
import { SearchService } from './search.service';

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(SearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('configAlgolia method', () => {
    it('should return config object when called', () => {
      const config = service.configAlgolia(true);
      expect(config).toBeTruthy();
      expect(typeof config).toBe('object');
    });

    [true, false].forEach(routing => {
      it(`should return config with expected properties given routing = "${routing}"`, () => {
        const config = service.configAlgolia(routing);
        expect(typeof config.indexName).toBe('string');
        expect(typeof config.apiKey).toBe('string');
        expect(typeof config.appId).toBe('string');
        expect(config.routing).toBe(routing);
        expect(config.firstSearch).toBe(true);
        expect(typeof config.searchFunction).toBe('function');
      });
    });

    describe('configAlgolia.searchFunction()', () => {
      let helper;
      let config;

      beforeEach(() => {
        helper = { state: { query: undefined }, search() { } };
        spyOn(helper, 'search');
        config = service.configAlgolia(true);
      });

      const shouldCallSearch = [
        {
          query: 'search query',
          firstSearch: true
        },
        {
          query: 'search query',
          firstSearch: false
        },
        {
          query: null,
          firstSearch: false
        }
      ];

      const shouldNotCallSearch = [
        {
          query: null,
          firstSearch: true
        },
        {
          query: null,
          firstSearch: null
        },
        {
          query: undefined,
          firstSearch: null
        },
        {
          query: '',
          firstSearch: null
        },
        {
          query: false,
          firstSearch: null
        }
      ];

      shouldCallSearch.forEach(condition => {
        it(`should call helper.search if state.query is "${condition.query}" and firstSearch is "${condition.firstSearch}"`, () => {
          helper.state.query = condition.query;
          config.firstSearch = condition.firstSearch;

          config.searchFunction(helper);

          expect(helper.search).toHaveBeenCalledTimes(1);
        });
      });

      shouldNotCallSearch.forEach(condition => {
        it(`should not call helper.search if state.query is "${condition.query}" and firstSearch is "${condition.firstSearch}"`, () => {
          helper.state.query = condition.query;
          config.firstSearch = condition.firstSearch;

          config.searchFunction(helper);

          expect(helper.search).toHaveBeenCalledTimes(0);
        });
      });

      it('should set config.firstSearch to false if helper.search is called', () => {
        helper.state.query = 'search query';

        expect(config.firstSearch).toBe(true);

        config.searchFunction(helper);

        expect(config.firstSearch).toBe(false);
      });

      it('config.firstSearch should remain false if helper.search is called more than once', () => {
        helper.state.query = 'search query';

        expect(config.firstSearch).toBe(true);

        for (let i = 0; i <= 3; i++) {
          config.searchFunction(helper);
          expect(config.firstSearch).toBe(false);
        }
      });
    });
  });
});
