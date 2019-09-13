// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { SearchComponent } from './search.component';

// describe('SearchComponent', () => {
//   let component: SearchComponent;
//   let fixture: ComponentFixture<SearchComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ SearchComponent ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(SearchComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { By } from '@angular/platform-browser';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/throw';

import { Component, Directive } from '@angular/core';
import { SearchComponent } from './search.component';
import { SearchService } from '../../services/search.service';
import { NativeWindowRefService } from '../../services/native-window-ref.service';
import { Angulartics2Segment } from 'angulartics2/segment';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { AnalyticsService } from '../../services/analytics.service';

@Injectable()
class MockNativeWindowRefService { }

@Injectable()
class MockAnalyticsService { }

@Injectable()
class MockSearchService {
  configAlgolia(given) {
    return given;
  }
}

describe('SearchComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SearchComponent
      ],
      providers: [
        { provide: SearchService, useClass: MockSearchService },
        { provide: NativeWindowRefService, useClass: MockNativeWindowRefService },
        { provide: Angulartics2Segment, useClass: MockAnalyticsService },
        { provide: Angulartics2GoogleAnalytics, useClass: MockAnalyticsService },
        { provide: AnalyticsService, useClass: MockAnalyticsService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
  });

  it('should be created', async () => {
    expect(component).toBeTruthy();
  });

  it('should set config when ngOnInit() is called', async () => {
    component.routingEnabled = true;

    expect(component.config).toBeUndefined();

    component.ngOnInit();

    expect(component.config).toBeTruthy();
  });

  it('should have ais-instantsearch tag with config', () => {
    component.routingEnabled = true;
    component.config = {};

    const instantSearchElement = fixture.nativeElement.querySelector('ais-instantsearch');
    expect(instantSearchElement).toBeTruthy();
  });
});
