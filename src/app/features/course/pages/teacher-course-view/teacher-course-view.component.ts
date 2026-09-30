import {Component, inject, OnInit} from '@angular/core';
import {PageLayoutComponent} from '@core/layouts';
import {ActivatedRoute} from '@angular/router';
import {TeacherCourseViewResponse} from '@features/course/dtos/response/teacher-course-view-response';
import {TeacherCourseResponse} from '@features/course/dtos/response/teacher-course-response';
import {TeacherBatchResponse} from '@features/batch/dtos/response/teacher-batch-response';
import {
  CourseAnnouncementListComponent
} from '@features/announcement/components/course-announcement-list/course-announcement-list.component';
import {CourseDescriptionComponent} from '@features/course/components/course-description/course-description.component';
import {CourseHeroComponent} from '@features/course/components/course-hero/course-hero.component';
import {CourseViewShellComponent} from '@features/course/components/course-view-shell/course-view-shell.component';
import {
  MatExpansionPanel, MatExpansionPanelContent,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {NoContentComponent} from '@shared/components/no-content/no-content.component';
import {ModuleCardComponent} from '@features/module/components/module-card/module-card.component';

@Component({
  selector: 'app-teacher-course-view',
  imports: [
    PageLayoutComponent,
    CourseAnnouncementListComponent,
    CourseDescriptionComponent,
    CourseHeroComponent,
    CourseViewShellComponent,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    NoContentComponent,
    MatExpansionPanelContent,
    ModuleCardComponent
  ],
  templateUrl: './teacher-course-view.component.html',
  styleUrl: './teacher-course-view.component.css'
})
export class TeacherCourseViewComponent implements OnInit{
    protected loading: boolean = false;
    protected window = globalThis.window ;

    protected courseViewResponse!: TeacherCourseViewResponse;
    protected course!: TeacherCourseResponse;
    protected batches: TeacherBatchResponse[] = [];

    protected readonly activatedRoute = inject(ActivatedRoute);

    ngOnInit(): void {
      this.loading = true;
        this.activatedRoute.data.subscribe(({course})=>{
          if (course) {
            this.courseViewResponse = course;
            this.course = course.course;
            this.batches = course.batches;
          }
          this.loading = false;
        })
    }
}
