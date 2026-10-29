import {Component, inject, input} from '@angular/core';
import {BatchService} from '@features/batch/services/batch/batch.service';
import {MatPaginator,} from '@angular/material/paginator';
import {PaginationRequest} from '@shared/utils/requests/PaginationRequest';
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
  MatTable,
} from '@angular/material/table';
import {StudentUserResponse} from '@features/student/dtos/responses/student-user-response/student-user-response';
import {PageLayoutComponent} from '@core/layouts';
import {NoContentComponent} from '@shared/components/no-content/no-content.component';
import {PhonePipePipe} from '@shared/utils/pipes/phone-pipe/phone-pipe.pipe';
import {NgOptimizedImage} from '@angular/common';
import {FormGroup, NonNullableFormBuilder} from '@angular/forms';
import {StudentBatchEnrollmentStatus} from '@features/student-batch-enrollment/enums/student-batch-enrollment-status';
import {BasePaginatedFilterComponent} from '@shared/utils/base/BasePaginatedFilterComponent';
import {BatchStudentFilterRequest} from '@features/batch/dtos/request/batch-student-filter-request';
import {Observable} from 'rxjs';
import {FilterFieldConfig} from '@shared/utils/config/filter-config';
import {FilterToolbarComponent} from '@shared/components/filter-toolbar/filter-toolbar.component';
import {ArrowUpDown, LucideAngularModule} from 'lucide-angular';
import {environment} from '@env/environment.development';

@Component({
  selector: 'app-batch-student-section',
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
    NoContentComponent,
    MatPaginator,
    MatNoDataRow,
    PhonePipePipe,
    NgOptimizedImage,
    FilterToolbarComponent,
    LucideAngularModule,
  ],
  templateUrl: './batch-student-section.component.html',
  styleUrl: './batch-student-section.component.css'
})
export class BatchStudentSectionComponent extends BasePaginatedFilterComponent<StudentUserResponse, BatchStudentFilterRequest>{
  batchId = input.required<number>();

  private readonly batchService:BatchService = inject(BatchService);
  private readonly fb = inject(NonNullableFormBuilder);

  protected filterForm: FormGroup = this.fb.group({
    search: [''],
    enrollmentDate: [undefined],
    enrollmentStatus: [undefined as StudentBatchEnrollmentStatus | undefined]
  })

  protected columns:string[] = ['id','dp', 'name', 'email', 'contact'];
  protected sortByFields:string[] = ['created_date'];

  protected readonly filterFields:FilterFieldConfig[] = [
    {key: 'search', label: 'Search', type: 'text', placeholder: 'Search by name or email', colSpan: 'lg:col-span-2'},
    {key: 'enrollmentDate', label: 'Enrollment Date', type: 'date', placeholder: 'Select enrollment date',colSpan: 'lg:col-span-2'},
    {key: 'enrollmentStatus', label: 'Enrollment Status', type: 'select', placeholder: 'All Status',colSpan: 'lg:col-span-1', options: [
      {label: 'Enrolled', value: StudentBatchEnrollmentStatus.ACTIVE},
      {label: 'Pending', value: StudentBatchEnrollmentStatus.COMPLETED},
      {label: 'Cancelled', value: StudentBatchEnrollmentStatus.SUSPENDED}
    ]}
  ];

  protected fetchApiData(pagination:PaginationRequest, filters: BatchStudentFilterRequest):Observable<any> {
    return this.batchService.getStudentsByBatch(this.batchId(), pagination, filters)
  }

  protected override mapFormToFilter(formValues: Record<string, any>): BatchStudentFilterRequest {
    return {
      name: formValues['search'] || undefined,
      email: formValues['search'] || undefined,
      enrolledDate: formValues['enrollmentDate'] || undefined,
      enrollmentStatus: formValues['enrollmentStatus'] || undefined
    };
  }

  protected readonly ArrowUpDown = ArrowUpDown;
  protected readonly environment = environment;
}
