// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { isPlatformBrowser, AsyncPipe } from '@angular/common';
import { By } from '@angular/platform-browser';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/throw';

import { Component, Directive } from '@angular/core';
import { SuggestedComponent } from './suggested.component';
import { ContentfulService } from 'src/app/services/contentful.service';
import { ParseMarkdownPipe } from 'src/app/pipes/parseMarkdown.pipe';
import { Observable, from } from 'rxjs';
import { Suggested } from 'src/app/suggested';

// @Injectable()
// class MockContentfulService{
//   getSuggestedContentBlock(): Observable<Suggested>{
//     return new Observable<Suggested>(() => {

//       // return {unsubscribe() {new Suggested('<h1>Fake Content</h1>');}}
//       return {subscribe() {new Suggested('<h1>Fake Content</h1>');}}
//     });
//   }
// }

describe('SuggestedComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SuggestedComponent, ParseMarkdownPipe
      ],
      providers: [
        ContentfulService,
        // {provide: ContentfulService, useClass: MockContentfulService},
        AsyncPipe
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(SuggestedComponent);
    component = fixture.componentInstance;
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });

  it('should set content when ngOnInit() is called', async () => {
    expect(component.content$).toBeUndefined();

    component.ngOnInit();

    expect(component.content$).toBeTruthy();
    expect(typeof component.content$).toBe('object');
  });

  it('should not display if results.query is truthy', () => {
    component.results = { query: 'results' };

    fixture.detectChanges();

    const nodes = fixture.nativeElement.childNodes;
    expect(nodes.length).toBeGreaterThanOrEqual(1);
    expect(nodes[0].data).toMatch(/"ng-reflect-ng-if":\W?"false"/);
  });

  it('should display if results.query is falsy', () => {
    component.results = { query: undefined };

    fixture.detectChanges();

    const nodes = fixture.nativeElement.childNodes;
    expect(nodes.length).toBeGreaterThanOrEqual(1);
    expect(nodes[0].data).toMatch(/"ng-reflect-ng-if":\W?"true"/);
  });

  it('should display content block content if it exists', () => {
    //TODO figure out how to pass content$ observer
  })

  //TODO also need to test as if content observer never recieved a content block
  it('should not display content block content if it does not exist', () => {
    component.results = { query: undefined };

    fixture.detectChanges();

    const nodes = fixture.nativeElement.childNodes;
    expect(nodes.length).toBeGreaterThanOrEqual(3);
    expect(nodes[2].data).toMatch(/"ng-reflect-ng-if":\W?null/);
  })

  // test ParseMarkdownPipe integration here
  it('should display content with markdown parsed', () => {
    //TODO
  });
});