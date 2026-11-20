import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationItemComponent } from './conversation-item.component';

describe('ConversationItemComponent', () => {
  let component: ConversationItemComponent;
  let fixture: ComponentFixture<ConversationItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConversationItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConversationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
