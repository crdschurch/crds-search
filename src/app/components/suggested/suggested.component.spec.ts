import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { SuggestedComponent } from './suggested.component';
import { ContentfulService } from 'src/app/services/contentful.service';
import { ParseMarkdownPipe } from 'src/app/pipes/parseMarkdown.pipe';

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
    component.ngOnInit();

    fixture.detectChanges();

    const nodes = fixture.nativeElement.childNodes;
    expect(nodes.length).toBeGreaterThanOrEqual(1);
    expect(nodes[0].data).toMatch(/"ng-reflect-ng-if": null/);
  });

  it('should not display content block content if it does not exist', () => {
    component.results = { query: undefined };

    fixture.detectChanges();

    const nodes = fixture.nativeElement.childNodes;
    expect(nodes.length).toBeGreaterThanOrEqual(3);
    expect(nodes[2].data).toMatch(/"ng-reflect-ng-if": "true"/);
  });
});
