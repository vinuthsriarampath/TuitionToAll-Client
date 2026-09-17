import {Component, inject, input, OnInit} from '@angular/core';
import {
  AssignmentSubmissionService
} from '@features/assignment-submission/services/assignment-submission-service/assignment-submission.service';
import {AlertService} from '@core/services/alerts/alert.service';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {
  StudentAssignmentSubmissionResponse
} from '@features/assignment-submission/dtos/responses/student-assignment-submission-response';
import {PaginationRequest} from '@shared/utils/requests/PaginationRequest';
import {CardShellComponent} from '@shared/ui';
import {DatePipe} from '@angular/common';
import {environment} from '@env/environment.development';
import {
  AssignmentSubmissionStatusBadgeComponent
} from '@features/assignment-submission/components/assignment-submission-status-badge/assignment-submission-status-badge.component';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {NoContentComponent} from '@shared/components/no-content/no-content.component';
import {LucideAngularModule, RefreshCw} from 'lucide-angular';

@Component({
  selector: 'app-student-assignment-submission-list',
  imports: [
    CardShellComponent,
    MatTable,
    MatColumnDef,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    DatePipe,
    AssignmentSubmissionStatusBadgeComponent,
    MatPaginator,
    NoContentComponent,
    MatNoDataRow,
    LucideAngularModule
  ],
  templateUrl: './student-assignment-submission-list.component.html',
  styleUrl: './student-assignment-submission-list.component.css'
})
export class StudentAssignmentSubmissionListComponent implements OnInit{
  assignmentId = input.required<number>();

  protected loading: boolean = false;
  protected readonly dataSource:MatTableDataSource<StudentAssignmentSubmissionResponse> = new MatTableDataSource<StudentAssignmentSubmissionResponse>([]);
  protected readonly displayedColumns:string[] = ['id','status','attemptNo','marksGained','grade','submittedAt','file'];

  private readonly submissionService = inject(AssignmentSubmissionService);
  private readonly alertService = inject(AlertService);

  protected totalElements:number = 0;
  protected pageIndex:number = 0;
  protected pageSize:number = 10;

  ngOnInit(): void {
      this.loadSubmissions();
  }

  protected loadSubmissions():void{

    this.loading = true;

    const pagination = new PaginationRequest();
    pagination.page = this.pageIndex;
    pagination.size = this.pageSize;
    pagination.direction = 'desc';
    pagination.sortBy = ['submitted_at'];

    this.submissionService.getMySubmissions(this.assignmentId(),pagination).subscribe({
      next: res => {
        if(res.data){
          this.dataSource.data = res.data ?? [];
          this.totalElements = res.totalElements ?? 0;
          this.pageIndex = res.page ?? 0;
          this.pageSize = res.size ?? 10;
        }
        this.loading = false;
      },
      error: err => {
        this.alertService.triggerErrorAlert(err.error.message ?? "An error occurred while fetching submissions");
        this.loading = false;
      }
    })
  }

  protected readonly environment = environment;

  protected onPageChange($event: PageEvent) {
    this.pageIndex = $event.pageIndex;
    this.pageSize = $event.pageSize;
    this.loadSubmissions();
  }

  protected readonly RefreshCw = RefreshCw;
}
