import {Component, input, OnInit} from '@angular/core';
import {CurrencyPipe, NgOptimizedImage} from '@angular/common';
import {BadgeComponent, CardShellComponent} from '@shared/ui';
import {environment} from '@env/environment.development';
import {Course} from '@features/course/dtos/response/course';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-course-card',
  imports: [
    CardShellComponent,
    CurrencyPipe,
    BadgeComponent,
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent implements OnInit{

  course = input.required<Course>();
  protected readonly environment = environment;
  protected thumbnailSrc:string = '';
  ngOnInit(): void {
      this.thumbnailSrc = this.environment.COURSE_API + this.course().thumbnail;
  }
  onImageError(): void {
    this.thumbnailSrc = 'no_image_provided.png';
  }
}
