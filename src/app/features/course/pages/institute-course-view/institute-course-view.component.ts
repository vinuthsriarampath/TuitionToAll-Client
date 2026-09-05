import {Component, inject, OnInit} from '@angular/core';
import {Course} from '@features/course/dtos/response/course';
import {AlertService} from '@core/services/alerts/alert.service';
import {CourseService} from '@features/course/services/course/course.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {PageLayoutComponent} from '@core/layouts';
import {BadgeComponent, CardShellComponent} from '@shared/ui';
import {CourseDescriptionComponent} from '@features/course/components/course-description/course-description.component';
import {CourseHeroComponent} from '@features/course/components/course-hero/course-hero.component';
import {CourseStatsComponent} from '@features/course/components/course-stats/course-stats.component';
import {CourseTreeComponent} from '@features/course/components/course-tree/course-tree.component';
import {
  CourseAnnouncementListComponent
} from '@features/announcement/components/course-announcement-list/course-announcement-list.component';
import {CourseViewShellComponent} from '@features/course/components/course-view-shell/course-view-shell.component';

@Component({
  selector: 'app-institute-course-view',
  imports: [
    PageLayoutComponent,
    BadgeComponent,
    CourseDescriptionComponent,
    CourseHeroComponent,
    CourseStatsComponent,
    RouterLink,
    CourseTreeComponent,
    CardShellComponent,
    CourseAnnouncementListComponent,
    CourseViewShellComponent
  ],
  templateUrl: './institute-course-view.component.html',
  styleUrl: './institute-course-view.component.css'
})
export class InstituteCourseViewComponent implements OnInit{

  protected courseId!:number;
  protected course!:Course;

  protected loading:boolean = false;
  protected readonly window = globalThis.window;

  private readonly activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ course }) => {
      if (course) {
        this.course = course;
        this.courseId = course.id;
        console.log(this.course);
      }
    });
  }
}
