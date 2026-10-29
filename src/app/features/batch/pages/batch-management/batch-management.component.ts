import {Component, inject} from '@angular/core';
import {ArrowLeft, ArrowUpDown, Edit, Eye, LucideAngularModule} from 'lucide-angular';
import {ActivatedRoute, RouterLink} from '@angular/router';
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
import {NgClass} from '@angular/common';
import {BatchEnrollmentStatus} from '../../enums/batch-enrollment-status';
import {BatchStatus} from '../../enums/batch-status';
import {MatTooltip} from '@angular/material/tooltip';
import {MatPaginator} from '@angular/material/paginator';
import {CreateBatchDialogComponent} from '../../dialogs/create-batch-dialog/create-batch-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {UpdateBatchDialogComponent} from '../../dialogs/update-batch-dialog/update-batch-dialog.component';
import {Batch} from '@features/batch/dtos/response/batch';
import {BatchService} from '@features/batch/services/batch/batch.service';
import {NoContentComponent} from '@shared/components/no-content/no-content.component';
import {PaginationRequest} from '@shared/utils/requests/PaginationRequest';
import {CardShellComponent, SelectOption} from '@shared/ui';
import {BasePaginatedFilterComponent} from '@shared/utils/base/BasePaginatedFilterComponent';
import {BatchFilterRequest} from '@features/batch/dtos/request/batch-filter-request';
import {FormGroup, NonNullableFormBuilder} from '@angular/forms';
import {FilterFieldConfig} from '@shared/utils/config/filter-config';
import {Observable} from 'rxjs';
import {FilterToolbarComponent} from '@shared/components/filter-toolbar/filter-toolbar.component';

@Component({
  selector: 'app-batch-management',
  imports: [
    LucideAngularModule,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    NgClass,
    MatTooltip,
    RouterLink,
    MatPaginator,
    NoContentComponent,
    MatNoDataRow,
    CardShellComponent,
    FilterToolbarComponent
  ],
  templateUrl: './batch-management.component.html',
  styleUrl: './batch-management.component.css'
})
export class BatchManagementComponent extends BasePaginatedFilterComponent<Batch, BatchFilterRequest>{

  protected readonly window = globalThis.window;
  private readonly batchService: BatchService =  inject(BatchService);
  private readonly activatedRoute =  inject(ActivatedRoute);
  private readonly dialog: MatDialog = inject(MatDialog);
  private readonly fb = inject(NonNullableFormBuilder);

  private courseId:number = -1;

  constructor() {
    super();
    this.activatedRoute.paramMap.subscribe(params =>{
      this.courseId = Number.parseInt(params.get('courseId') ?? '-1');
      this.fetchBatches(this.courseId);
    })
  }

  protected filterForm :FormGroup = this.fb.group({
    name: [''],
    status: [undefined as BatchStatus | undefined],
    enrollmentStatus: [undefined as BatchEnrollmentStatus | undefined]
  })

  protected readonly columnsToDisplay: string[] = ['id','name','start_date','start_time','max_seat_limit','batch_status','batch_enrollment_status','actions'];
  protected sortByFields = ['created_date'];

  protected readonly batchStatusOptions: SelectOption[] = Object.values(BatchStatus).map(v => ({value: v, label: v}));
  protected readonly batchEnrollmentStatusOptions: SelectOption[] = Object.values(BatchEnrollmentStatus).map(v => ({value: v, label: v}));

  protected readonly filterConfig: FilterFieldConfig[] = [
    { key: 'name', label: 'Batch Name', type: 'text', placeholder: 'Search by name...', colSpan: 'lg:col-span-2' },
    { key: 'status', label: 'Batch Status', type: 'select', placeholder: 'All status...', colSpan: 'lg:col-span-2', options: this.batchStatusOptions },
    { key: 'enrollmentStatus', label: 'Enrollment Status', type: 'select', placeholder: 'All enrollment status...', colSpan: 'lg:col-span-2', options: this.batchEnrollmentStatusOptions },
  ]

  protected fetchApiData(pagination:PaginationRequest, filters:BatchFilterRequest):Observable<any> {
    return this.batchService.getAllBatchesByCourseId(this.courseId,pagination,filters)
  }

  protected mapFormToFilter(formValues: Record<string, any>): BatchFilterRequest {
    return {
      id : formValues['id'] || undefined,
      batchName : formValues['name'] || undefined,
      status : formValues['status'] || undefined,
      enrollmentStatus : formValues['enrollmentStatus'] || undefined
    };
  }

  private readonly fetchBatches = (courseId:number) => {
    this.loading.set(true);

    const pagination:PaginationRequest =  new PaginationRequest(this.pageIndex(), this.pageSize(), 'desc', ['created_date']);

    this.batchService.getAllBatchesByCourseId(courseId,pagination).subscribe({
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
        this.alertService.triggerErrorAlert(err.error.message ?? "Failed to fetch batches.");
        this.loading.set(false);
      }
    })
  }

  protected openCreateBatchDialog(){

    const dialogRef =  this.dialog.open(CreateBatchDialogComponent,{
      width: '500px',
      panelClass: 'create-batch-dialog',
      data: this.courseId
    });

    dialogRef.afterOpened().subscribe(() => {
      document.querySelector('input')?.focus();
    });

    dialogRef.afterClosed().subscribe({
      next: (res:Batch) => {
        if(res){
          this.alertService.triggerSuccessAlert("Batch created successfully");
          this.fetchBatches(this.courseId);
        }
      },
      error: (err) => {
        this.alertService.triggerErrorAlert(err.error.message);
      }
    })
  }

  protected openUpdateBatchDialog(batch:Batch){
    const dialogRef =  this.dialog.open(UpdateBatchDialogComponent,{
      width: '500px',
      panelClass: 'update-batch-dialog',
      data: {
        batch:batch,
        courseId: this.courseId
      }
    });

    dialogRef.afterOpened().subscribe(() => {
      document.querySelector('input')?.focus();
    });

    dialogRef.afterClosed().subscribe({
      next: (res:Batch) => {
        if(res){
          this.alertService.triggerSuccessAlert("Batch updated successfully");
          this.fetchBatches(this.courseId);
        }
      },
      error: (err) => {
        this.alertService.triggerErrorAlert(err.error.message);
      }
    })
  }

  protected readonly BatchEnrollmentStatus = BatchEnrollmentStatus;
  protected readonly BatchStatus = BatchStatus;
  protected readonly Eye = Eye;
  protected readonly Edit = Edit;
  protected readonly ArrowLeft = ArrowLeft;
  protected readonly ArrowUpDown = ArrowUpDown;
}
