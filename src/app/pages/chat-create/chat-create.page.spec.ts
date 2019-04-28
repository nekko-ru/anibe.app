import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatCreatePage } from './chat-create.page';

describe('ChatCreatePage', () => {
  let component: ChatCreatePage;
  let fixture: ComponentFixture<ChatCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatCreatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
