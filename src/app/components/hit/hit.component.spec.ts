import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HitComponent } from './hit.component';
import { ImgixAspectRatioPipe } from 'src/app/pipes/imgix-aspect-ratio.pipe';

class MockImgix {
  init(obj) {
    return obj;
  }
}

describe('HitComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HitComponent,
        ImgixAspectRatioPipe
      ],
      providers: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(HitComponent);
    component = fixture.debugElement.componentInstance;
    component.hit = {};

    window['imgix'] = new MockImgix(); // imgix is globally defined by another script
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });

  describe('Tests hit.image states', () => {
    it('should have 3 blocks if hit.image is truthy: image link, text, meta', () => {
      component.hit.image = 'image.png';
      component.hit.url = 'https://www.crossroads.net/';

      fixture.detectChanges();

      const imageLink = fixture.nativeElement.querySelector('.hit-img');
      expect(imageLink).toBeTruthy();
      expect(imageLink.href).toBe(component.hit.url);
      const hitText = fixture.nativeElement.querySelector('app-hit-text');
      expect(hitText).toBeTruthy();
      const hitMeta = fixture.nativeElement.querySelector('.hit-meta');
      expect(hitMeta).toBeTruthy();
    });

    it('should have image if hit.image is truthy', () => {
      component.hit.image = 'image.png';
      component.hit.title = 'Some Article';

      fixture.detectChanges();

      const image = fixture.nativeElement.querySelector('.img-responsive');
      expect(image).toBeTruthy();
      expect(image.alt).toBe(component.hit.title);
    });

    it('should have 2 blocks if hit.image is falsy: text, meta', () => {
      component.hit.image = null;

      fixture.detectChanges();

      const imageLink = fixture.nativeElement.querySelector('.hit-img');
      expect(imageLink).toBeFalsy();
      const hitText = fixture.nativeElement.querySelector('app-hit-text');
      expect(hitText).toBeTruthy();
      const hitMeta = fixture.nativeElement.querySelector('.hit-meta');
      expect(hitMeta).toBeTruthy();
      expect(hitMeta.tagName).toBe('DIV');
    });

    [undefined, null, false, ''].forEach(image => {
      it(`should not have image link if hit.image is "${image}"`, () => {
        component.hit.image = image;

        fixture.detectChanges();

        const imageLink = fixture.nativeElement.querySelector('.hit-img');
        expect(imageLink).toBeFalsy();
      });
    });

    const cardStampContent = ['article', 'video', 'episode', 'message'];
    cardStampContent.forEach(contentType => {
      it(`should have card stamp with duration and image if content type is "${contentType}"`, () => {
        component.hit.image = 'image.png';
        component.hit.contentType = contentType;
        component.hit.duration = '1m 30s';

        fixture.detectChanges();

        const cardStamp = fixture.nativeElement.querySelector('.card-stamp');
        expect(cardStamp).toBeTruthy();

        const duration = cardStamp.querySelector('[data-automation-id="hit-duration"]');
        expect(duration.textContent).toBe(component.hit.duration);

        const image = cardStamp.querySelector('.icon > use');
        expect(image.href).toBeTruthy();
      });
    });

    const noCardStampContent = ['series', 'song', 'promo', 'album'];
    noCardStampContent.forEach(contentType => {
      it(`should not have card stamp if content type is "${contentType}"`, () => {
        component.hit.image = 'image.png';
        component.hit.contentType = contentType;

        fixture.detectChanges();

        const cardStamp = fixture.nativeElement.querySelector('.card-stamp');
        expect(cardStamp).toBeFalsy();
      });
    });
  });

  describe('Tests hit meta section', () => {
    it('should have a directions link if hit has map url', () => {
      component.hit.map_url = 'https://www.google.com/maps/place/Crossroads+Church+Oakley';

      fixture.detectChanges();

      const getDirections = fixture.nativeElement.querySelector('[data-automation-id="hit-directions"]');
      expect(getDirections).toBeTruthy();
      expect(getDirections.href).toBe(component.hit.map_url);
    });

    it('should not have directions link if hit has no map url', () => {
      fixture.detectChanges();

      const getDirections = fixture.nativeElement.querySelector('[data-automation-id="hit-directions"]');
      expect(getDirections).toBeFalsy();
    });

    it('should have date range if hit has start & end date', () => {
      component.hit.start_date = '9.16.19';
      component.hit.end_date = '10.16.19';

      fixture.detectChanges();

      const dateRange = fixture.nativeElement.querySelector('.hit-series-date');
      expect(dateRange).toBeTruthy();
      expect(dateRange.textContent).toBe(`${component.hit.start_date} - ${component.hit.end_date}`);
    });

    it('should not have date range if missing start date', () => {
      component.hit.end_date = '10.16.19';

      fixture.detectChanges();

      const dateRange = fixture.nativeElement.querySelector('.hit-series-date');
      expect(dateRange).toBeFalsy();
    });

    it('should not have date range if missing end date', () => {
      component.hit.start_date = '9.16.19';

      fixture.detectChanges();

      const dateRange = fixture.nativeElement.querySelector('.hit-series-date');
      expect(dateRange).toBeFalsy();
    });

    it('should have date if hit has date', () => {
      component.hit.date = '9.16.19';

      fixture.detectChanges();

      const date = fixture.nativeElement.querySelector('.hit-date');
      expect(date).toBeTruthy();
      expect(date.textContent).toBe(component.hit.date);
    });

    it('should not have date if hit missing date', () => {
      fixture.detectChanges();

      const date = fixture.nativeElement.querySelector('.hit-date');
      expect(date).toBeFalsy();
    });
  });
});
