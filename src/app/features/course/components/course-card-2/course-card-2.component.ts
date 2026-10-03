import {Component, input} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {environment} from '@env/environment.development';
import {BadgeComponent, CardShellComponent} from '@shared/ui';
import {CourseLevel} from '@features/course/enums/course-level';
import {CourseLanguage} from '@features/course/enums/course-language';
import {CourseMode} from '@features/course/enums/course-mode';
import {LucideAngularModule, Star} from 'lucide-angular';

@Component({
  selector: 'app-course-card-2',
  imports: [
    NgOptimizedImage,
    CardShellComponent,
    LucideAngularModule,
    BadgeComponent
  ],
  templateUrl: './course-card-2.component.html',
  styleUrl: './course-card-2.component.css'
})
export class CourseCard2Component {
  title = input.required<string>();
  description = input.required<string>();
  thumbnail = input<string>();
  level = input.required<CourseLevel>();
  language = input.required<CourseLanguage>();
  mode = input.required<CourseMode>();
  averageRating = input<number>();

  protected readonly environment = environment;
  protected readonly Star = Star;
}
