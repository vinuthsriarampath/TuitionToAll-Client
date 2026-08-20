import { Component } from '@angular/core';
import {ArrowRight, LucideAngularModule, Star} from 'lucide-angular';
import {DecimalPipe} from '@angular/common';
import {CardShellComponent} from '@shared/ui';
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
    CardShellComponent
  ],
  templateUrl: './performance-widget.component.html',
  styleUrl: './performance-widget.component.css'
})
export class PerformanceWidgetComponent {
  courses: CoursePerformance[] = [
    { rank: '01', title: 'Java Programming', studentsCount: 324, activeBatchesCount: 6, rating: 4.8, progressPercentage: 100 },
    { rank: '02', title: 'Spring Boot', studentsCount: 286, activeBatchesCount: 5, rating: 4.7, progressPercentage: 85 },
    { rank: '03', title: 'Angular', studentsCount: 241, activeBatchesCount: 4, rating: 4.6, progressPercentage: 70 },
    { rank: '04', title: 'Database Management', studentsCount: 198, activeBatchesCount: 3, rating: 4.5, progressPercentage: 58 }
  ];
  protected readonly ArrowRight = ArrowRight;
  protected readonly Star = Star;
}
