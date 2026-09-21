import {Component, input} from '@angular/core';
import {CardShellComponent} from '@shared/ui';

@Component({
  selector: 'app-course-description',
  imports: [
    CardShellComponent
  ],
  templateUrl: './course-description.component.html',
  styleUrl: './course-description.component.css'
})
export class CourseDescriptionComponent {

  description = input.required<string>();
}
