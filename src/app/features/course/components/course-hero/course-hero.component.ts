import {Component, input} from '@angular/core';
import {Course} from "@features/course/dtos/response/course";
import {CurrencyPipe, NgOptimizedImage} from '@angular/common';
import {environment} from '@env/environment.development';
import {BadgeComponent} from '@shared/ui';

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

  course = input.required<Course>();
  courseLoading = input<boolean>(false);
  showPrice = input<boolean>(false);

  protected readonly window = globalThis.window;

  protected readonly environment = environment;
}
