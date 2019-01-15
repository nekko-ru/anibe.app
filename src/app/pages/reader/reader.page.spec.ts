import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderPage } from './reader.page';

describe('ReaderPage', () => {
  let component: ReaderPage;
  let fixture: ComponentFixture<ReaderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReaderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReaderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
