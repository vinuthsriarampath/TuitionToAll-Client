import {Component, input} from '@angular/core';
import {Course} from '../../../../core/models/course';
import {CardShellComponent} from '../../../../shared/ui/card-shell/card-shell.component';
import {CurrencyPipe, NgOptimizedImage} from '@angular/common';
import {BadgeComponent} from '../../../../shared/ui/badge/badge.component';
import {environment} from '../../../../../environment/environment.development';

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
