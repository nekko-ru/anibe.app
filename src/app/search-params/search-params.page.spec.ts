import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchParamsPage } from './search-params.page';

describe('SearchParamsPage', () => {
  let component: SearchParamsPage;
  let fixture: ComponentFixture<SearchParamsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchParamsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchParamsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
