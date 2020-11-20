import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SortBy } from "./sort-by.component";

describe("SortBy", () => {
  let component: SortBy;
  let fixture: ComponentFixture<SortBy>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SortBy],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortBy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
