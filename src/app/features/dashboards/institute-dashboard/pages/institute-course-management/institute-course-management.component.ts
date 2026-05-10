import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {CourseService} from '../../../../../core/services/course/course.service';
import {Course} from '../../../../../core/models/course';
import {AlertService} from '../../../../../core/services/alerts/alert.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {CurrencyPipe, NgClass} from '@angular/common';
import {RouterLink} from '@angular/router';
import {Eye, LucideAngularModule} from 'lucide-angular';
import {MatTooltip} from '@angular/material/tooltip';
import {PageLayoutComponent} from '../../../../../core/layouts/page-layout/page-layout.component';

@Component({
  selector: 'app-institute-course-management',
  imports: [
    MatTableModule,
    NgClass,
    CurrencyPipe,
    MatPaginatorModule,
    RouterLink,
    LucideAngularModule,
    MatTooltip,
    PageLayoutComponent,
  ],
  templateUrl: './institute-course-management.component.html',
  styleUrl: './institute-course-management.component.css'
})
export class InstituteCourseManagementComponent implements AfterViewInit {

  protected readonly Eye = Eye;

  courses: Course[] = [];
  dataSource = new MatTableDataSource<Course>();
  loading: boolean = false;

  displayedColumns: string[] = [ 'id', 'title', 'category', 'durationInHours', 'price', 'status', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    private readonly courseService: CourseService,
    private readonly alertService: AlertService
  ) {
    this.fetchCourses();
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  fetchCourses(): void {
    this.triggerLoading();
    this.dataSource.data = [{} as Course];
    this.courseService.getInstitute().subscribe({
      next: (res) => {
        this.courses = Array.isArray(res.data) ? res.data : [];
        this.dataSource.data = this.courses;
        this.triggerLoading();
      },
      error: (err) => {
        this.alertService.triggerErrorAlert(err.error.message);
        this.courses = [];
        this.dataSource.data = [{} as Course];
        this.triggerLoading();
      }
    });
  }

  triggerLoading(): void {
    this.loading = !this.loading;
  }

}
