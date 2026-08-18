import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseFeedbackReviewComponent } from './course-feedback-review.component';

describe('CourseFeedbackReviewComponent', () => {
  let component: CourseFeedbackReviewComponent;
  let fixture: ComponentFixture<CourseFeedbackReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseFeedbackReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseFeedbackReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
