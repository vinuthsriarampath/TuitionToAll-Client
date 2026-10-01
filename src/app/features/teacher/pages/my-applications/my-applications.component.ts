import {Component, inject, OnInit} from '@angular/core';
import {TeacherService} from '@features/teacher/services/teacher/teacher.service';
import {AlertService} from '@core/services/alerts/alert.service';
import {PaginationRequest} from '@shared/utils/requests/PaginationRequest';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {TeacherApplicationResponse} from '@features/applications/dtos/response/teacher-application-response';
import {PageLayoutComponent} from '@core/layouts';
import {DatePipe, TitleCasePipe} from '@angular/common';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {RouterLink} from '@angular/router';
import {BadgeComponent} from '@shared/ui';
import {ApplicationStatus} from '@features/applications/enums/application-status';

@Component({
  selector: 'app-my-applications',
  imports: [
    PageLayoutComponent,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    DatePipe,
    MatPaginator,
    RouterLink,
    BadgeComponent,
    TitleCasePipe
  ],
  templateUrl: './my-applications.component.html',
  styleUrl: './my-applications.component.css'
})
export class MyApplicationsComponent implements OnInit{

  protected loading: boolean = false;

  protected readonly teacherService = inject(TeacherService);
  protected readonly alertService = inject(AlertService);

  protected dataSource :MatTableDataSource<TeacherApplicationResponse> = new MatTableDataSource<TeacherApplicationResponse>([]);
  protected displayedColumns: string[] = ['applicationId', 'vacancy', 'institute', 'applicationStatus', 'appliedDate' ];

  protected pageIndex:number = 0;
  protected pageSize:number = 10;
  protected totalItems:number = 0;

  ngOnInit(): void {
     this.loadMyApplications();
  }

  private loadMyApplications(): void {

    this.loading = true;

    const pagination = new PaginationRequest(this.pageIndex, this.pageSize)

    this.teacherService.getMyApplications(pagination).subscribe({
      next: (res)=> {
        if(res.data){
          this.dataSource.data = res.data ?? [];
          this.pageIndex = res.page ?? 0;
          this.pageSize = res.size ?? 10;
          this.totalItems = res.totalElements ?? 0;
        }
        this.loading = false;
      },
      error: err => {
        this.loading = false;
        this.alertService.triggerErrorAlert(err.error?.message || "Failed to load applications");
      }
    })
  }

  protected onPageChange($event: PageEvent) {
    this.pageIndex = $event.pageIndex;
    this.pageSize = $event.pageSize;
    this.loadMyApplications();
  }

  protected readonly ApplicationStatus = ApplicationStatus;
}
