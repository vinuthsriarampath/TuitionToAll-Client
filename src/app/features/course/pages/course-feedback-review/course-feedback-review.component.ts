import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '@features/course/dtos/response/course';
import {PageLayoutComponent} from '@core/layouts';
import {MatTab, MatTabContent, MatTabGroup} from '@angular/material/tabs';
import {
  CourseReviewSectionComponent
} from '@features/review/components/course-review-section/course-review-section.component';

@Component({
  selector: 'app-course-feedback-review',
  imports: [
    PageLayoutComponent,
    MatTabGroup,
    MatTab,
    MatTabContent,
    CourseReviewSectionComponent
  ],
  templateUrl: './course-feedback-review.component.html',
  styleUrl: './course-feedback-review.component.css'
})
export class CourseFeedbackReviewComponent implements OnInit{


    course!:Course;

    private readonly router:ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.course=this.router.snapshot.data['course'];
  }
}
