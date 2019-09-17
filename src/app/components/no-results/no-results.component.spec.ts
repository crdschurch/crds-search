import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NoResultsComponent } from './no-results.component';

describe('NoResultsComponent', () => {
  const corkboardRegex = new RegExp('https?:\/\/(?:int|demo|www).crossroads.net\/corkboard');
  const groupRegex = new RegExp('https?:\/\/(?:int|demo|www).crossroads.net\/groups\/search');
  const helpRegex = new RegExp('https?:\/\/(?:int|demo|www).crossroads.net\/help');

  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        NoResultsComponent
      ],
      providers: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(NoResultsComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });

  it('should set urls when ngOnInit() is called', async () => {
    expect(component.corkboardUrl).toBeUndefined();
    expect(component.groupsUrl).toBeUndefined();
    expect(component.helpUrl).toBeUndefined();

    component.ngOnInit();

    expect(component.corkboardUrl).toMatch(corkboardRegex);
    expect(component.groupsUrl).toMatch(groupRegex);
    expect(component.helpUrl).toMatch(helpRegex);
  });

  const queryMade = [' ', 'some query'];
  queryMade.forEach(query => {
    it(`should display if a query is "${query}" and has no hits`, () => {
      component.hits = [];
      component.results = { query: query };

      fixture.detectChanges();

      const noResults = fixture.nativeElement.querySelector('.no-results');
      expect(noResults).toBeTruthy();
    });
  });

  const noResultsQueries = [undefined, null, ''];
  noResultsQueries.forEach(query => {
    it(`should not display if a query is "${query}" and has no hits`, () => {
      component.hits = [];
      component.results = { query: query };

      fixture.detectChanges();

      const noResults = fixture.nativeElement.querySelector('.no-results');
      expect(noResults).toBeFalsy();
    });
  });

  it('should include valid links to corkboard', () => {
    component.hits = [];
    component.results = { query: 'some query' };

    fixture.detectChanges();

    const corkboard = fixture.nativeElement.querySelector('[data-automation-id="no-results-corkboard-link"]');
    expect(corkboard).toBeTruthy();
    expect(corkboard.href).toMatch(corkboardRegex);
  });

  it('should include valid links to groups', () => {
    component.hits = [];
    component.results = { query: 'some query' };

    fixture.detectChanges();

    const groups = fixture.nativeElement.querySelector('[data-automation-id="no-results-groups-link"]');
    expect(groups).toBeTruthy();
    expect(groups.href).toMatch(groupRegex);
  });

  it('should include valid links to help', () => {
    component.hits = [];
    component.results = { query: 'some query' };

    fixture.detectChanges();

    const help = fixture.nativeElement.querySelector('[data-automation-id="no-results-help-link"]');
    expect(help).toBeTruthy();
    expect(help.href).toMatch(helpRegex);
  });
});
