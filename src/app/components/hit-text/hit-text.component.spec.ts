import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HitTextComponent } from './hit-text.component';

describe('HitTextComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HitTextComponent
      ],
      providers: [
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(HitTextComponent);
    component = fixture.componentInstance;
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });

  it('should display category if hit.category is truthy', () => {
    component.hit = {
      category: 'Work'
    };

    fixture.detectChanges();

    const category = fixture.nativeElement.querySelector('[data-automation-id="hit-category"]');
    expect(category).toBeTruthy();
    expect(category.textContent).toBe(component.hit.category);
  });

  it('should not display category if hit.category is falsy', () => {
    component.hit = {};

    fixture.detectChanges();

    const category = fixture.nativeElement.querySelector('[data-automation-id="hit-category"]');
    expect(category).toBeFalsy();
  });

  it('should have link to url from title', () => {
    component.hit = {
      url: 'https://www.crossroads.net/'
    };

    fixture.detectChanges();

    const title = fixture.nativeElement.querySelector('.hit-title');
    expect(title).toBeTruthy();
    expect(title.href).toBe(component.hit.url);
  });

  it('should display description if hit.description is truthy', () => {
    component.hit = {
      description: 'some description'
    };
    const matchRegex = new RegExp(component.hit.description);

    fixture.detectChanges();

    const description = fixture.nativeElement.querySelector('[data-automation-id="hit-description"]');
    expect(description).toBeTruthy();
    expect(description.textContent).toMatch(matchRegex);
  });

  it('should display only part of a very long description', () => {
    component.hit = {
      // tslint:disable-next-line: max-line-length
      description: '1 In the beginning God created the heavens and the earth. 2 Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters. 3 And God said, “Let there be light,” and there was light.'
    };
    const maxLineLength = 180;
    const matchRegex = new RegExp(`^.{${maxLineLength}}...`);

    fixture.detectChanges();

    const description = fixture.nativeElement.querySelector('[data-automation-id="hit-description"]');
    expect(description.textContent).toMatch(matchRegex);
  });

  it('should not display description if hit.description is falsy', () => {
    component.hit = {};

    fixture.detectChanges();

    const description = fixture.nativeElement.querySelector('[data-automation-id="hit-description"]');
    expect(description).toBeFalsy();
  });

  it('should display service times if hit.serviceTimes is truthy', () => {
    component.hit = {
      serviceTimes: 'Sunday morning'
    };
    const matchRegex = new RegExp(component.hit.serviceTimes);

    fixture.detectChanges();

    const serviceTimes = fixture.nativeElement.querySelector('[data-automation-id="hit-serviceTimes"]');
    expect(serviceTimes).toBeTruthy();
    expect(serviceTimes.textContent).toMatch(matchRegex);
  });

  it('should not display service times if hit.serviceTimes is falsy', () => {
    component.hit = {};

    fixture.detectChanges();

    const serviceTimes = fixture.nativeElement.querySelector('[data-automation-id="hit-serviceTimes"]');
    expect(serviceTimes).toBeFalsy();
  });

  it('should display author if hit.author is truthy', () => {
    component.hit = {
      author: 'St Paul'
    };

    fixture.detectChanges();

    const author = fixture.nativeElement.querySelector('.hit-author');
    expect(author).toBeTruthy();
    expect(author.textContent).toBe(component.hit.author);
  });

  it('should not display author if hit.author is falsy', () => {
    component.hit = {};

    fixture.detectChanges();

    const author = fixture.nativeElement.querySelector('.hit-author');
    expect(author).toBeFalsy();
  });

  it('should display series if hit.series is truthy', () => {
    component.hit = {
      series: 'Real Fake Series'
    };

    fixture.detectChanges();

    const series = fixture.nativeElement.querySelector('.hit-series');
    expect(series).toBeTruthy();
    expect(series.textContent).toBe(component.hit.series);
  });

  it('should not display series if hit.series is falsy', () => {
    component.hit = {};

    fixture.detectChanges();

    const series = fixture.nativeElement.querySelector('.hit-series');
    expect(series).toBeFalsy();
  });

  it('should display number of messages if a series has messages', () => {
    component.hit = {
      contentType: 'series',
      children_count: 5
    };
    const matchRegex = new RegExp(`${component.hit.children_count} messages`);

    fixture.detectChanges();

    const messageCount = fixture.nativeElement.querySelector('.hit-children');
    expect(messageCount).toBeTruthy();
    expect(messageCount.textContent).toMatch(matchRegex);
  });

  [0, -1, null, undefined].forEach(badCount => {
    it(`should not display number of messages if a series has "${badCount}" messages`, () => {
      component.hit = {
        contentType: 'series',
        children_count: badCount
      };

      fixture.detectChanges();

      const messageCount = fixture.nativeElement.querySelector('.hit-children');
      expect(messageCount).toBeFalsy();
    });
  });

  it('should display number of episodes if a podcast has episodes', () => {
    component.hit = {
      contentType: 'podcast',
      children_count: 5
    };
    const matchRegex = new RegExp(`${component.hit.children_count} episodes`);

    fixture.detectChanges();

    const episodeCount = fixture.nativeElement.querySelector('.hit-children');
    expect(episodeCount).toBeTruthy();
    expect(episodeCount.textContent).toMatch(matchRegex);
  });

  [0, -1, null, undefined].forEach(badCount => {
    it(`should not display number of episodes if a podcast has "${badCount}" episodes`, () => {
      component.hit = {
        contentType: 'podcast',
        children_count: badCount
      };

      fixture.detectChanges();

      const episodeCount = fixture.nativeElement.querySelector('.hit-children');
      expect(episodeCount).toBeFalsy();
    });
  });

  it('should not display number of child entries if the content type does not have child entries', () => {
    component.hit = {
      contentType: 'video'
    };

    fixture.detectChanges();

    const episodeCount = fixture.nativeElement.querySelector('.hit-children');
    expect(episodeCount).toBeFalsy();
  });

  ['page', 'promo'].forEach(type => {
    it(`should display url if content type is "${type}"`, () => {
      component.hit = {
        contentType: type,
        url: 'https://www.crossroads.net/'
      };

      fixture.detectChanges();

      const url = fixture.nativeElement.querySelector('.hit-url');
      expect(url).toBeTruthy();
      expect(url.href).toBe(component.hit.url);
      expect(url.textContent).toBe(component.hit.url);
    });
  });

  it('should not display url if content type should not display it', () => {
    component.hit = {
      contentType: 'video',
      url: 'https://www.crossroads.net/'
    };

    fixture.detectChanges();

    const url = fixture.nativeElement.querySelector('.hit-url');
    expect(url).toBeFalsy();
  });
});
