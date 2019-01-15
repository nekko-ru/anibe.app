import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectChapterPage } from './select-chapter.page';

describe('SelectChapterPage', () => {
  let component: SelectChapterPage;
  let fixture: ComponentFixture<SelectChapterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectChapterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectChapterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
