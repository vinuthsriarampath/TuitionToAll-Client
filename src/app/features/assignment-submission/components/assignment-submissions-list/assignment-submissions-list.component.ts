import {Component, computed, inject, input} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import {
  AssignmentSubmissionDetailedResponse
} from '@features/assignment-submission/dtos/responses/assignment-submission-detailed-response';
import {
  AssignmentSubmissionService
} from '@features/assignment-submission/services/assignment-submission-service/assignment-submission.service';
import {PaginationRequest} from '@shared/utils/requests/PaginationRequest';
import {Eye, LucideAngularModule, RefreshCw} from 'lucide-angular';
import {CardShellComponent} from '@shared/ui';
import {
  AssignmentSubmissionStatusBadgeComponent
} from '@features/assignment-submission/components/assignment-submission-status-badge/assignment-submission-status-badge.component';
import {NoContentComponent} from '@shared/components/no-content/no-content.component';
import {MatPaginator} from '@angular/material/paginator';
import {DatePipe} from '@angular/common';
import {MatTooltip} from '@angular/material/tooltip';
import {MatDialog} from '@angular/material/dialog';
import {
  AssignmentSubmissionViewComponent
} from '@features/assignment-submission/components/assignment-submission-view/assignment-submission-view.component';
import {GradingRageResponse} from '@features/assignments/dtos/response/grading-range/grading-range-response';
import {BasePaginatedFilterComponent} from '@shared/utils/base/BasePaginatedFilterComponent';
import {
  AssignmentSubmissionFilterRequest
} from '@features/assignment-submission/dtos/requests/assignment-submission-filter-request';
import {FormGroup, NonNullableFormBuilder} from '@angular/forms';
import {Observable} from 'rxjs';
import {AssignmentSubmitStatus} from '@features/assignment-submission/enums/assignment-submit-status';
import {FilterFieldConfig} from '@shared/utils/config/filter-config';
import {FilterToolbarComponent} from '@shared/components/filter-toolbar/filter-toolbar.component';

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
    MatTooltip,
    FilterToolbarComponent
  ],
  templateUrl: './assignment-submissions-list.component.html',
  styleUrl: './assignment-submissions-list.component.css'
})
export class AssignmentSubmissionsListComponent extends BasePaginatedFilterComponent<AssignmentSubmissionDetailedResponse, AssignmentSubmissionFilterRequest>{
  assignmentId = input.required<number>();
  totalMarks = input.required<number>();
  gradingRanges = input.required<GradingRageResponse[]>();

  protected readonly displayedColumns: string[] = ['id', 'student', 'submittedAt', 'status', 'attemptNo', 'marksGained', 'actions'];
  protected sortByFields:string[] = ['attempt_no','submitted_at'];

  private readonly submissionService = inject(AssignmentSubmissionService);
  private readonly fb = inject(NonNullableFormBuilder);
  protected readonly dialog = inject(MatDialog);

  protected filterForm:FormGroup = this.fb.group({
    studentName: [''],
    status: [undefined as AssignmentSubmitStatus | undefined],
    grade: [undefined as string | undefined],
  });


  protected readonly filterFields = computed<FilterFieldConfig[]>(() => [
    {
      key: 'studentName',
      label: 'Student Name',
      type: 'text',
      placeholder: 'Student Name',
      colSpan: 'lg:col-span-2'
    },
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      placeholder: 'Select Status',
      options: Object.values(AssignmentSubmitStatus).map(status => ({
        label: status,
        value: status
      })),
      colSpan: 'lg:col-span-2'
    },
    {
      key: 'grade',
      label: 'Grade',
      type: 'select',
      options: this.gradingRanges().map(range => ({
        label: range.desiredGrade,
        value: range.desiredGrade
      })),
      placeholder: 'Select Grade',
      colSpan: 'lg:col-span-2'
    },
  ]);

  protected fetchApiData(pagination:PaginationRequest, filters:AssignmentSubmissionFilterRequest): Observable<any> {
    return this.submissionService.getAllSubmissions(this.assignmentId(), pagination,filters)
  }

  protected override mapFormToFilter(formValues: Record<string, any>): AssignmentSubmissionFilterRequest {
    return {
      studentName: formValues['studentName'] || undefined,
      status: formValues['status'] || undefined,
      grade: formValues['grade'] || undefined,
    };
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
        this.refresh();
      }
    });
  }

  protected readonly RefreshCw = RefreshCw;
  protected readonly Eye = Eye;
}
