import { TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HitsComponent } from './hits.component';
import { AnalyticsService } from 'src/app/services/analytics.service';

@Injectable()
class MockAnalyticsService {
  trackSearch(a, b) {
    return Object.is(a, b);
  }
}

class MockSubscription {
  unsubscribe() { }
}

describe('HitsComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HitsComponent
      ],
      providers: [
        { provide: AnalyticsService, useClass: MockAnalyticsService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(HitsComponent);

    component = fixture.debugElement.componentInstance;
    component.results$Subscription = new MockSubscription();
    component.results = {
      query: 'some query'
    };
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });

  it('should have element if results.query is not empty', () => {
    component.hits = [{}];

    fixture.detectChanges();

    const nodes = fixture.nativeElement.childNodes;
    expect(nodes.length).toBeGreaterThanOrEqual(1);
    expect(nodes[0].data).toMatch(/"ng-reflect-ng-if":\W?"true"/);
  });

  it('should not have elements if results.query is not empty', () => {
    component.results.query = '';
    component.hits = [{}];

    fixture.detectChanges();

    const nodes = fixture.nativeElement.childNodes;
    expect(nodes.length).toBeGreaterThanOrEqual(1);
    expect(nodes[0].data).toMatch(/"ng-reflect-ng-if":\W?"false"/);
  });

  describe('Tests hit counter', () => {
    beforeEach(() => {
      component.results.hitsPerPage = 2;
      component.results.nbHits = 10;
    });

    it('should not display if only 1 hit exists', () => {
      component.hits = [{}];

      fixture.detectChanges();

      const counter = fixture.nativeElement.querySelector('[data-automation-id="hits-hit-counter"]');
      expect(counter).toBeFalsy();
    });

    it('should display if > 1 hits exist', () => {
      component.hits = [{}, {}];

      fixture.detectChanges();

      const counter = fixture.nativeElement.querySelector('[data-automation-id="hits-hit-counter"]');
      expect(counter).toBeTruthy();
    });

    it('should display text if on first of many result pages', () => {
      component.hits = [{}, {}];

      fixture.detectChanges();

      const counter = fixture.nativeElement.querySelector('[data-automation-id="hits-hit-counter"]');
      expect(counter.textContent).toBe('showing 2 of 10 results');
    });

    it('should display text if on second of many result pages', () => {
      component.hits = [{}, {}, {}];

      fixture.detectChanges();

      const counter = fixture.nativeElement.querySelector('[data-automation-id="hits-hit-counter"]');
      expect(counter.textContent).toBe('showing 3 of 10 results');
    });

    it('should display text if on last of many result pages', () => {
      component.hits = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

      fixture.detectChanges();

      const counter = fixture.nativeElement.querySelector('[data-automation-id="hits-hit-counter"]');
      expect(counter.textContent).toBe('10 results');
    });

    it('should display text if there are fewer results than can fit on the page', () => {
      component.results.hitsPerPage = 5;
      component.hits = [{}, {}];

      fixture.detectChanges();

      const counter = fixture.nativeElement.querySelector('[data-automation-id="hits-hit-counter"]');
      expect(counter.textContent).toBe('2 results');
    });

    it('should display text if all results can fit on one page', () => {
      component.results.hitsPerPage = 3;
      component.results.nbHits = 3;
      component.hits = [{}, {}, {}];

      fixture.detectChanges();

      const counter = fixture.nativeElement.querySelector('[data-automation-id="hits-hit-counter"]');
      expect(counter.textContent).toBe('3 results');
    });
  });

  describe('Tests template of hit', () => {
    it('should display app-hit if hit.showHTML is falsy', () => {
      component.hits = [{ contentType: 'article' }];

      fixture.detectChanges();

      const appHit = fixture.nativeElement.querySelector('app-hit');
      expect(appHit).toBeTruthy();
      expect(appHit.className).toBe('hit hit-article');

      const appHitWidget = fixture.nativeElement.querySelector('app-hit-widget');
      expect(appHitWidget).toBeFalsy();
    });

    it('should display app-hit-widget if hit.showHTML is truthy', () => {
      component.hits = [{ showHTML: 'true' }];

      fixture.detectChanges();

      const appHitWidget = fixture.nativeElement.querySelector('app-hit-widget');
      expect(appHitWidget).toBeTruthy();

      const appHit = fixture.nativeElement.querySelector('app-hit');
      expect(appHit).toBeFalsy();
    });

    it('should display app-hit or app-hit-widget based on hit list', () => {
      component.hits = [{ contentType: 'cactus' }, { showHTML: 'true' }];

      fixture.detectChanges();

      const appHit = fixture.nativeElement.querySelector('app-hit');
      expect(appHit).toBeTruthy();
      expect(appHit.className).toBe('hit hit-cactus');

      const appHitWidget = fixture.nativeElement.querySelector('app-hit-widget');
      expect(appHitWidget).toBeTruthy();
    });
  });

  it('should display show more button if not all hits displayed', () => {
    component.results.nbHits = 3;
    component.hits = [{}, {}];

    fixture.detectChanges();

    const showMore = fixture.nativeElement.querySelector('.hits-show-more-container');
    expect(showMore).toBeTruthy();
  });

  it('should not display show more button if all hits displayed', () => {
    component.results.nbHits = 2;
    component.hits = [{}, {}];

    fixture.detectChanges();

    const showMore = fixture.nativeElement.querySelector('.hits-show-more-container');
    expect(showMore).toBeFalsy();
  });

  describe('Tests isSearchWidget', () => {
    it('should return true if is a search widget', () => {
      const fakeElement = document.createElement('div');
      fakeElement.className = 'hit hit-widget';

      const isWidget = component.isSearchWidget(fakeElement);
      expect(isWidget).toBe(true);
    });

    it('should return false if not search widget', () => {
      const fakeElement = document.createElement('div');
      fakeElement.className = 'hit hit-article';

      const isWidget = component.isSearchWidget(fakeElement);
      expect(isWidget).toBe(false);
    });
  });

  describe('Tests isParent', () => {
    it('should return true if element is hit card', () => {
      const fakeElement = document.createElement('app-hit');
      fakeElement.setAttribute('data-hit-id', '123');

      const isParent = component.isParent(fakeElement);
      expect(isParent).toBeTruthy();
    });

    it('should return true if element is hit card', () => {
      const fakeElement = document.createElement('button');

      const isParent = component.isParent(fakeElement);
      expect(isParent).toBeUndefined();
    });
  });
});
