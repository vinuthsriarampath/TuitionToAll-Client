import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationSearchComponent } from './conversation-search.component';

describe('ConversationSearchComponent', () => {
  let component: ConversationSearchComponent;
  let fixture: ComponentFixture<ConversationSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConversationSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConversationSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
