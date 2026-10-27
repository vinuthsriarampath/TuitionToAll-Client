import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FeedPostCardComponent} from './feed-post-card.component';

describe('FeedPostCardComponent', () => {
  let component: FeedPostCardComponent;
  let fixture: ComponentFixture<FeedPostCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedPostCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedPostCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
