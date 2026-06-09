import {Component, input} from '@angular/core';
import {CurrencyPipe, NgOptimizedImage} from '@angular/common';
import {BadgeComponent, CardShellComponent} from '@shared/ui';
import {environment} from '@env/environment.development';
import {Course} from '@features/course/dtos/response/course';

@Component({
  selector: 'app-course-card',
  imports: [
    CardShellComponent,
    CurrencyPipe,
    BadgeComponent,
    NgOptimizedImage
  ],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent {

  course = input.required<Course>();
  protected readonly environment = environment;
}
