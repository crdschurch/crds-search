import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { By } from '@angular/platform-browser';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/throw';

import {Component, Directive} from '@angular/core';
import {HitsComponent} from './hits.component';
import {AnalyticsService} from 'src/app/services/analytics.service';

@Injectable()
class MockAnalyticsService { }

//TODO all this
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
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(HitsComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #handleHitClick()', async () => {
    // const result = component.handleHitClick(event);
  });

  it('should run #isSearchWidget()', async () => {
    // const result = component.isSearchWidget(el);
  });

  it('should run #isParent()', async () => {
    // const result = component.isParent(el);
  });

  it('should run #ngOnInit()', async () => {
    // const result = component.ngOnInit();
  });

  it('should run #ngOnChanges()', async () => {
    // const result = component.ngOnChanges(changes);
  });

  it('should run #ngOnDestroy()', async () => {
    // const result = component.ngOnDestroy();
  });

  //TODO test app-hit-widget
});
