import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CourseFeedbackSectionComponent} from './course-feedback-section.component';

describe('CourseFeedbackSectionComponent', () => {
  let component: CourseFeedbackSectionComponent;
  let fixture: ComponentFixture<CourseFeedbackSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseFeedbackSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseFeedbackSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
