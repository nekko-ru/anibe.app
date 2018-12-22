import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetstartPage } from './getstart.page';

describe('GetstartPage', () => {
  let component: GetstartPage;
  let fixture: ComponentFixture<GetstartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetstartPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetstartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
