import {Component, inject, input, OnInit} from '@angular/core';
import {BatchService} from '@features/batch/services/batch/batch.service';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {PaginationRequest} from '@shared/utils/requests/PaginationRequest';
import { AlertService } from "@core/services/alerts/alert.service";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {StudentUserResponse} from '@features/student/dtos/responses/student-user-response/student-user-response';
import {PageLayoutComponent} from '@core/layouts';
import {NoContentComponent} from '@shared/components/no-content/no-content.component';
import {PhonePipePipe} from '@shared/utils/pipes/phone-pipe/phone-pipe.pipe';
import {NgOptimizedImage} from '@angular/common';

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
    NgOptimizedImage
  ],
  templateUrl: './batch-student-section.component.html',
  styleUrl: './batch-student-section.component.css'
})
export class BatchStudentSectionComponent implements OnInit{
  batchId = input.required<number>();

  protected loading:boolean = false;

  private readonly batchService:BatchService = inject(BatchService);
  private readonly alertService:AlertService = inject(AlertService);
  protected dataSource:MatTableDataSource<StudentUserResponse> = new MatTableDataSource<StudentUserResponse>([]);

  protected columns:string[] = ['id','dp', 'name', 'email', 'contact'];

  protected totalElements:number = 0
  protected pageIndex:number = 0;
  protected pageSize:number = 10;

  ngOnInit(): void {
    if(this.batchId()) this.loadBatchStudents();
  }

  private loadBatchStudents():void {
    this.triggerLoading();
    let pagination:PaginationRequest = new PaginationRequest();
    pagination.page=this.pageIndex;
    pagination.size=this.pageSize;
    pagination.direction = 'ASC';
    this.batchService.getStudentsByBatch(this.batchId(), pagination).subscribe({
      next: (res)=>{
        if(res.data){
          this.totalElements=res.totalElements ?? 0;
          this.pageIndex = res.page ?? 0;
          this.pageSize = res.size ?? 10;
          this.dataSource.data = res.data;
        }
        this.triggerLoading();
      },
      error: (err)=>{
        this.alertService.triggerErrorAlert(err.error.message);
        this.triggerLoading();
      }
    });
  }

  protected onPageChange(event:PageEvent):void{
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadBatchStudents();
  }

  private triggerLoading():void {
    this.loading = !this.loading;
  }
}
