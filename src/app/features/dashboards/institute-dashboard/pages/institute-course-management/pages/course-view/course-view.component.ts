import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {CourseService} from '../../../../../../../core/services/course/course.service';
import {AlertService} from '../../../../../../../core/services/alerts/alert.service';
import {Course} from '../../../../../../../core/models/course';
import {CurrencyPipe, NgClass, NgOptimizedImage} from '@angular/common';
import {environment} from '../../../../../../../environment/environment.development';

@Component({
  selector: 'app-course-view',
  imports: [
    NgOptimizedImage,
    RouterLink,
    NgClass,
    CurrencyPipe
  ],
  templateUrl: './course-view.component.html',
  styleUrl: './course-view.component.css'
})
export class CourseViewComponent implements OnInit {

  protected course:Course | null = null;

  private readonly alertService = inject(AlertService);
  private readonly courseService = inject(CourseService);
  private readonly activatedRoute = inject(ActivatedRoute);


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const courseId = params.get('courseId') ?? '';
      console.log(courseId);
      this.loadCourseDetails(Number.parseInt(courseId));
    })
  }

  loadCourseDetails(courseId: number) {
    this.courseService.getCourseById(courseId).subscribe({
      next: (res) => {
        this.course=res;
      },
      error: (err) => {
        this.alertService.triggerErrorAlert(err.error.message);
      }
    })
  }

  protected readonly environment = environment;
}
