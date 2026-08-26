import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CourseReviewSectionComponent} from './course-review-section.component';

describe('CourseReviewSectionComponent', () => {
  let component: CourseReviewSectionComponent;
  let fixture: ComponentFixture<CourseReviewSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseReviewSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseReviewSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
