import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {ArrowLeft, Eye, LucideAngularModule} from 'lucide-angular';
import {PageTitleComponent} from '../../../../../../../../../../shared/components/page-title/page-title.component';
import {BatchService} from '../../../../../../../../../../core/services/batch/batch.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {AlertService} from '../../../../../../../../../../core/services/alerts/alert.service';
import {Batch} from '../../../../../../../../../../core/models/batch';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from '@angular/material/table';
import {NgClass} from '@angular/common';
import {BatchEnrollmentStatus} from '../../../../../../../../../../core/enums/batch-enrollment-status';
import {BatchStatus} from '../../../../../../../../../../core/enums/batch-status';
import {MatTooltip} from '@angular/material/tooltip';
import {MatPaginator} from '@angular/material/paginator';
import {Course} from '../../../../../../../../../../core/models/course';

@Component({
  selector: 'app-batch-management',
  imports: [
    LucideAngularModule,
    PageTitleComponent,
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
    MatPaginator
  ],
  templateUrl: './batch-management.component.html',
  styleUrl: './batch-management.component.css'
})
export class BatchManagementComponent implements OnInit, AfterViewInit{

  protected readonly ArrowLeft = ArrowLeft;
  protected readonly window = globalThis.window;

  private courseId:number = -1;
  protected batches:Batch[] = [];
  protected readonly columnsToDisplay: string[] = ['id','name','start_date','start_time','batch_status','batch_enrollment_status','actions'];
  dataSource = new MatTableDataSource<Course>();
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  private readonly batchService: BatchService =  inject(BatchService);
  private readonly activatedRoute =  inject(ActivatedRoute);
  private readonly alertService =  inject(AlertService);

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
    this.dataSource.data = [{} as Batch];
    this.batchService.getAllBatchesByCourseId(courseId).subscribe({
      next: (res) => {
        this.batches= Array.isArray(res.data) ? res.data : []
        this.dataSource.data = this.batches;
      },
      error: (err) => {
        this.alertService.triggerErrorAlert(err.error.message);
      }
    })
  }
  protected readonly BatchEnrollmentStatus = BatchEnrollmentStatus;
  protected readonly BatchStatus = BatchStatus;
  protected readonly Eye = Eye;
}
