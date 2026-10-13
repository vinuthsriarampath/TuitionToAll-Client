import {Component, inject, OnInit, signal} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {AlertService} from '@core/services/alerts/alert.service';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {CurrencyPipe, NgClass} from '@angular/common';
import {RouterLink} from '@angular/router';
import {Eye, LucideAngularModule} from 'lucide-angular';
import {MatTooltip} from '@angular/material/tooltip';
import {PageLayoutComponent} from '@core/layouts';
import {Course} from '@features/course/dtos/response/course';
import {CourseService} from '@features/course/services/course/course.service';
import {NoContentComponent} from '@shared/components/no-content/no-content.component';
import {PaginationRequest} from '@shared/utils/requests/PaginationRequest';

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
    NoContentComponent,
  ],
  templateUrl: './institute-course-management.component.html',
  styleUrl: './institute-course-management.component.css'
})
export class InstituteCourseManagementComponent implements OnInit {

  protected loading = signal<boolean>(false);

  protected dataSource:MatTableDataSource<Course> = new MatTableDataSource<Course>([]);

  private readonly courseService = inject(CourseService);
  private readonly alertService = inject(AlertService);

  protected displayedColumns: string[] = [ 'id', 'title', 'category', 'durationInHours', 'price', 'status', 'actions'];

  protected pageIndex = signal<number>(0);
  protected pageSize = signal<number>(10);
  protected totalElements = signal<number>(0);

  ngOnInit(): void {
    this.fetchCourses();
  }

  fetchCourses(): void {
    this.loading.set(true);

    const pagination = new PaginationRequest(this.pageIndex(), this.pageSize(), "desc", ['created_date']);

    this.courseService.getPaginatedCoursesForCurrentInstitute(pagination).subscribe({
      next: (res) => {
        if(res.data){
          this.dataSource.data = res.data ?? [];
          this.pageIndex.set(res.page ?? 0);
          this.pageSize.set(res.size ?? 10);
          this.totalElements.set(res.totalElements ?? 0);
        }
        this.loading.set(false);
      },
      error: (err) => {
        this.alertService.triggerErrorAlert(err.error.message ?? "Something went wrong while fetching courses.");
        this.loading.set(false);
      }
    });
  }

  onPageChange(event: PageEvent){
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.fetchCourses();
  }

  protected readonly Eye = Eye;
}
