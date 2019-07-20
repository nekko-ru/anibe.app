import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Reader2Page } from './reader2.page';

describe('Reader2Page', () => {
  let component: Reader2Page;
  let fixture: ComponentFixture<Reader2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Reader2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Reader2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
