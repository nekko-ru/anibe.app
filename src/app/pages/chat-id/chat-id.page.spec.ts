import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatIdPage } from './chat-id.page';

describe('ChatIdPage', () => {
  let component: ChatIdPage;
  let fixture: ComponentFixture<ChatIdPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatIdPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatIdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
