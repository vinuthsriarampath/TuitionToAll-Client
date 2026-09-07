import {Component, input} from '@angular/core';
import {Course} from "@features/course/dtos/response/course";
import {CurrencyPipe, NgOptimizedImage} from '@angular/common';
import {environment} from '@env/environment.development';
import {BadgeComponent} from '@shared/ui';
import {CourseCategory} from '@features/course/enums/course-category';
import {CourseLevel} from '@features/course/enums/course-level';
import {CourseLanguage} from '@features/course/enums/course-language';
import {CourseMode} from '@features/course/enums/course-mode';

@Component({
  selector: 'app-course-hero',
  imports: [
    NgOptimizedImage,
    BadgeComponent,
    CurrencyPipe
  ],
  templateUrl: './course-hero.component.html',
  styleUrl: './course-hero.component.css'
})
export class CourseHeroComponent {

  courseTitle = input.required<string>();
  courseThumbnail = input.required<string | undefined>();
  coursePrice = input<number>(0);
  courseCategory = input.required<CourseCategory>();
  courseLanguage = input.required<CourseLanguage>();
  courseLevel = input.required<CourseLevel>();
  courseMode = input.required<CourseMode>();
  courseDuration = input.required<number>();

  courseLoading = input<boolean>(false);
  showPrice = input<boolean>(false);

  protected readonly window = globalThis.window;

  protected readonly environment = environment;
}
