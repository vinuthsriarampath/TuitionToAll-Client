import {Component, inject, input, OnInit} from '@angular/core';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {
  AssignmentSubmissionDetailedResponse
} from '@features/assignment-submission/dtos/responses/assignment-submission-detailed-response';
import {
  AssignmentSubmissionService
} from '@features/assignment-submission/services/assignment-submission-service/assignment-submission.service';
import {AlertService} from '@core/services/alerts/alert.service';
import {PaginationRequest} from '@shared/utils/requests/PaginationRequest';
import {Eye, LucideAngularModule, RefreshCw} from 'lucide-angular';
import {CardShellComponent} from '@shared/ui';
import {
  AssignmentSubmissionStatusBadgeComponent
} from '@features/assignment-submission/components/assignment-submission-status-badge/assignment-submission-status-badge.component';
import {NoContentComponent} from '@shared/components/no-content/no-content.component';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {DatePipe} from '@angular/common';
import {MatTooltip} from '@angular/material/tooltip';
import {MatDialog} from '@angular/material/dialog';
import {
  AssignmentSubmissionViewComponent
} from '@features/assignment-submission/components/assignment-submission-view/assignment-submission-view.component';
import {GradingRageResponse} from '@features/assignments/dtos/response/grading-range/grading-range-response';

@Component({
  selector: 'app-assignment-submissions-list',
  imports: [
    LucideAngularModule,
    CardShellComponent,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    AssignmentSubmissionStatusBadgeComponent,
    MatHeaderRow,
    NoContentComponent,
    MatNoDataRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatPaginator,
    DatePipe,
    MatTooltip
  ],
  templateUrl: './assignment-submissions-list.component.html',
  styleUrl: './assignment-submissions-list.component.css'
})
export class AssignmentSubmissionsListComponent implements OnInit{
  assignmentId = input.required<number>();
  totalMarks = input.required<number>();
  gradingRanges = input.required<GradingRageResponse[]>();

  protected loading: boolean = false;
  protected dataSource: MatTableDataSource<AssignmentSubmissionDetailedResponse> = new MatTableDataSource<AssignmentSubmissionDetailedResponse>([]);
  protected readonly displayedColumns: string[] = ['id', 'student', 'submittedAt', 'status', 'attemptNo', 'marksGained', 'actions'];

  private readonly submissionService = inject(AssignmentSubmissionService);
  private readonly alertService = inject(AlertService);
  protected readonly dialog = inject(MatDialog);

  protected totalElements:number = 0;
  protected pageIndex:number = 0;
  protected pageSize:number = 10;

  ngOnInit(): void {
      this.loadSubmissions();
  }

  protected loadSubmissions(): void {
    this.loading = true;

    const pagination = new PaginationRequest();
    pagination.page = this.pageIndex;
    pagination.size = this.pageSize;
    pagination.direction = 'desc';
    pagination.sortBy = ['attempt_no','submitted_at'];

    this.submissionService.getAllSubmissions(this.assignmentId(), pagination).subscribe({
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
        this.loading = false;
        this.alertService.triggerErrorAlert(err.error.message ?? "An error occurred while fetching submissions");
      }
    });
  }


  protected readonly RefreshCw = RefreshCw;
  protected readonly Eye = Eye;

  protected OnPageChange($event: PageEvent) {
    this.pageIndex = $event.pageIndex;
    this.pageSize = $event.pageSize;
    this.loadSubmissions();
  }

  protected openViewSubmissionDialog(viewData: AssignmentSubmissionDetailedResponse): void {
    const dialogRef = this.dialog.open(AssignmentSubmissionViewComponent, {
      width: '50vw',
      maxWidth: '1200px',
      data: {
        submissionData: viewData,
        gradingRages : this.gradingRanges(),
        totalMarks: this.totalMarks()
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if(res){
        this.loadSubmissions();
      }
    });
  }
}
