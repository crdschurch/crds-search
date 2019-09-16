import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HitWidgetComponent } from './hit-widget.component';

class MockImgix {
  init(obj) {
    return obj;
  }
}

describe('HitWidgetComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HitWidgetComponent
      ],
      providers: [
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(HitWidgetComponent);
    component = fixture.debugElement.componentInstance;

    window['imgix'] = new MockImgix(); // imgix is globally defined by another script
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });

  it('should display widget if hit.image is truthy', () => {
    component.hit = {
      image: 'fakeImage.png'
    };

    fixture.detectChanges();

    const widget = fixture.nativeElement.querySelector('.hit-widget-image');
    expect(widget).toBeTruthy();
    const widgetNoImage = fixture.nativeElement.querySelector('[data-automation-id="hit-widget-description"]');
    expect(widgetNoImage).toBeFalsy();
  });

  it('should display image with title as alt', () => {
    component.hit = {
      image: 'fakeImage.png',
      title: 'Fake Title'
    };

    fixture.detectChanges();

    const image = fixture.nativeElement.querySelector('.img-responsive');
    expect(image).toBeTruthy();
    expect(image.alt).toBe(component.hit.title);
  });

  it('should display image with description', () => {
    component.hit = {
      image: 'fakeImage.png',
      description: 'this image has a description'
    };

    fixture.detectChanges();

    const content = fixture.nativeElement.querySelector('.hit-widget-content');
    expect(content).toBeTruthy();
    expect(content.textContent).toBe(component.hit.description);
  });

  it('should display widget without image if hit.image is falsy', () => {
    component.hit = {};

    fixture.detectChanges();

    const widgetNoImage = fixture.nativeElement.querySelector('[data-automation-id="hit-widget-description"]');
    expect(widgetNoImage).toBeTruthy();
    const widget = fixture.nativeElement.querySelector('.hit-widget-image');
    expect(widget).toBeFalsy();
  });

  it('should display description for widget without image', () => {
    component.hit = {
      description: 'this widget has a description'
    };

    fixture.detectChanges();

    const widgetNoImage = fixture.nativeElement.querySelector('[data-automation-id="hit-widget-description"]');
    expect(widgetNoImage.textContent).toBe(component.hit.description);
  });
});
