import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {ArrowLeft, Edit, Eye, LucideAngularModule} from 'lucide-angular';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {AlertService} from '@core/services/alerts/alert.service';
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
  MatTableDataSource
} from '@angular/material/table';
import {NgClass} from '@angular/common';
import {BatchEnrollmentStatus} from '../../enums/batch-enrollment-status';
import {BatchStatus} from '../../enums/batch-status';
import {MatTooltip} from '@angular/material/tooltip';
import {MatPaginator} from '@angular/material/paginator';
import {CreateBatchDialogComponent} from '../../dialogs/create-batch-dialog/create-batch-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {UpdateBatchDialogComponent} from '../../dialogs/update-batch-dialog/update-batch-dialog.component';
import {PageLayoutComponent} from '@core/layouts';
import {Batch} from '@features/batch/dtos/response/batch';
import {BatchService} from '@features/batch/services/batch/batch.service';
import {NoContentComponent} from '@shared/components/no-content/no-content.component';

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
    PageLayoutComponent,
    NoContentComponent,
    MatNoDataRow
  ],
  templateUrl: './batch-management.component.html',
  styleUrl: './batch-management.component.css'
})
export class BatchManagementComponent implements OnInit, AfterViewInit{

  protected readonly window = globalThis.window;
  protected loading:boolean = false;

  private courseId:number = -1;
  protected batches:Batch[] = [];
  protected readonly columnsToDisplay: string[] = ['id','name','start_date','start_time','max_seat_limit','batch_status','batch_enrollment_status','actions'];
  dataSource = new MatTableDataSource<Batch>();
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  private readonly batchService: BatchService =  inject(BatchService);
  private readonly activatedRoute =  inject(ActivatedRoute);
  private readonly alertService =  inject(AlertService);
  private readonly dialog: MatDialog = inject(MatDialog);

  protected openCreateBatchDialog(){

    const dialogRef =  this.dialog.open(CreateBatchDialogComponent,{
      maxWidth: '60vh',
      width: '100%',
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
      maxWidth: '60vh',
      width: '100%',
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

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params =>{
      this.courseId = Number.parseInt(params.get('courseId') ?? '-1');
      this.fetchBatches(this.courseId);
    })
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  private readonly fetchBatches = (courseId:number) => {
    this.triggerLoading();
    this.dataSource.data = [{} as Batch];
    this.batchService.getAllBatchesByCourseId(courseId).subscribe({
      next: (res) => {
        this.batches= Array.isArray(res.data) ? res.data : []
        this.dataSource.data = this.batches;
        this.triggerLoading();
      },
      error: (err) => {
        this.alertService.triggerErrorAlert(err.error.message);
        this.triggerLoading();
      }
    })
  }

  private triggerLoading():void{
    this.loading = !this.loading
  }
  protected readonly BatchEnrollmentStatus = BatchEnrollmentStatus;
  protected readonly BatchStatus = BatchStatus;
  protected readonly Eye = Eye;
  protected readonly Edit = Edit;
  protected readonly ArrowLeft = ArrowLeft;
}
