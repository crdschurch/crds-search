// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { SearchModalComponent } from './search-modal.component';

// describe('CrdsSearchComponent', () => {
//   let component: SearchModalComponent;
//   let fixture: ComponentFixture<SearchModalComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ SearchModalComponent ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(SearchModalComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });


import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchModalComponent } from './search-modal.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SearchModalComponent', () => {
  let fixture: ComponentFixture<SearchModalComponent>;
  let component: SearchModalComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SearchModalComponent
      ],
      providers: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchModalComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('Should create a component', () => {
    expect(component).toBeTruthy();
  });
});
