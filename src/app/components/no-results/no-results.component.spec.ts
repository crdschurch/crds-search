import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NoResultsComponent } from './no-results.component';

describe('NoResultsComponent', () => {
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

    expect(component.corkboardUrl).toBeTruthy();
    expect(component.groupsUrl).toBeTruthy();
    expect(component.helpUrl).toBeTruthy();
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
  })

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
});
