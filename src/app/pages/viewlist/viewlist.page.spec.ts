import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewlistPage } from './viewlist.page';

describe('ViewlistPage', () => {
  let component: ViewlistPage;
  let fixture: ComponentFixture<ViewlistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewlistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
