import {Component, effect, inject, input, OnInit} from '@angular/core';
import {CourseStatsResponse} from "@features/course/dtos/response/course-stats-response";
import {CardShellComponent} from '@shared/ui';
import {LucideAngularModule, Star} from 'lucide-angular';
import {CurrencyPipe, DecimalPipe} from '@angular/common';
import {AlertService} from '@core/services/alerts/alert.service';
import {CourseService} from '@features/course/services/course/course.service';

@Component({
  selector: 'app-course-stats',
  imports: [
    CardShellComponent,
    LucideAngularModule,
    DecimalPipe,
    CurrencyPipe
  ],
  templateUrl: './course-stats.component.html',
  styleUrl: './course-stats.component.css'
})
export class CourseStatsComponent implements OnInit {

  courseId = input.required<number>();
  courseAvgRating = input<number>(0.0);
  courseLoading = input<boolean>(false);

  protected statsLoading :boolean = false;
  protected courseStats!:CourseStatsResponse;

  private readonly alertService = inject(AlertService);
  private readonly courseService = inject(CourseService);

  ngOnInit(): void {
    this.loadCourseStats();
  }

  loadCourseStats():void{
    this.statsLoading = true;
    this.courseService.getCourseStats(this.courseId()).subscribe({
      next: (res) => {
        if(res.data){
          this.courseStats = res.data;
        }
        this.statsLoading = false;
      },
      error: (err) => {
        this.statsLoading = false;
        this.alertService.triggerErrorAlert(err.error.message);
      }
    })
  }

  protected readonly Star = Star;
}
