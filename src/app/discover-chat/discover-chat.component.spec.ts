import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverChatComponent } from './discover-chat.component';

describe('DiscoverChatComponent', () => {
  let component: DiscoverChatComponent;
  let fixture: ComponentFixture<DiscoverChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscoverChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscoverChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
