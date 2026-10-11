import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCommentCardComponent } from './post-comment-card.component';

describe('PostCommentCardComponent', () => {
  let component: PostCommentCardComponent;
  let fixture: ComponentFixture<PostCommentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostCommentCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostCommentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
