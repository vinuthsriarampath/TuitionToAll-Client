import {Component, input} from '@angular/core';
import {ArrowRight, LucideAngularModule, Star} from 'lucide-angular';
import {DecimalPipe} from '@angular/common';
import {CardShellComponent} from '@shared/ui';
import {CoursePerformanceResponse} from '@features/course/dtos/response/course-performance-response';
import {NoContentComponent} from '@shared/components/no-content/no-content.component';
import {RouterLink} from '@angular/router';

export interface CoursePerformance {
  rank: string;
  title: string;
  studentsCount: number;
  activeBatchesCount: number;
  rating: number;
  progressPercentage: number;
}

@Component({
  selector: 'app-performance-widget',
  imports: [
    LucideAngularModule,
    DecimalPipe,
    CardShellComponent,
    NoContentComponent,
    RouterLink
  ],
  templateUrl: './performance-widget.component.html',
  styleUrl: './performance-widget.component.css'
})
export class PerformanceWidgetComponent {
  courses = input.required<CoursePerformanceResponse[]>();
  protected readonly ArrowRight = ArrowRight;
  protected readonly Star = Star;
}
