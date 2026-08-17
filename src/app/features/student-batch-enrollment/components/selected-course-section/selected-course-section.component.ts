import {Component, input} from '@angular/core';
import {Course} from '@features/course/dtos/response/course';
import {BadgeComponent, CardShellComponent} from '@shared/ui';
import {DecimalPipe, TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-selected-course-section',
  imports: [
    BadgeComponent,
    CardShellComponent,
    DecimalPipe,
    TitleCasePipe
  ],
  templateUrl: './selected-course-section.component.html',
  styleUrl: './selected-course-section.component.css'
})
export class SelectedCourseSectionComponent {
  course = input.required<Course>();
}
