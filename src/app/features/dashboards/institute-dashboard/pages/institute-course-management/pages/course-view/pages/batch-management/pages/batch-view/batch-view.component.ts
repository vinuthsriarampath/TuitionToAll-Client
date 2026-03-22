import {Component, inject, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {BatchService} from '../../../../../../../../../../../core/services/batch/batch.service';
import {Batch} from '../../../../../../../../../../../core/models/batch';
import {AlertService} from '../../../../../../../../../../../core/services/alerts/alert.service';
import {ApiResponse} from '../../../../../../../../../../../core/dto/response-dto/api-response';
import {MatDialog} from '@angular/material/dialog';
import {UpdateBatchDialogComponent} from '../../models/update-batch-dialog/update-batch-dialog.component';
import {PageTitleComponent} from '../../../../../../../../../../../shared/components/page-title/page-title.component';

@Component({
  selector: 'app-batch-view',
  imports: [
    DatePipe,
    PageTitleComponent
  ],
  templateUrl: './batch-view.component.html',
  styleUrl: './batch-view.component.css'
})
export class BatchViewComponent implements OnInit {

  protected batchId!: number;
  protected batch!:Batch;

  protected readonly window = globalThis.window;

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly batchService = inject(BatchService);
  private readonly alertService = inject(AlertService);
  private readonly dialog:MatDialog = inject(MatDialog);

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.batchId = Number.parseInt(params.get('batchId') ?? '-1');
    });
    this.fetchBatchDetails(this.batchId);
  }

  private fetchBatchDetails(batchId:number):void{
      this.batchService.getBatchById(batchId).subscribe({
        next: (res:ApiResponse<Batch>) => {
          if(res.data){
            this.batch = res.data;
            console.log(res);
          }
        },
        error: (err) => {
          this.alertService.triggerErrorAlert(err.error.message);
        }
      })
  }

  protected editBatch():void{
    const dialogRef=this.dialog.open(UpdateBatchDialogComponent,{
      data:{
        batch:this.batch,
        courseId:this.batch.courseId
      }
    });

    dialogRef.afterClosed().subscribe({
      next: (res:Batch) => {
        if(res){
          this.alertService.triggerSuccessAlert("Batch updated successfully");
          this.fetchBatchDetails(res.id);
        }
      },
      error: (err) => {
        this.alertService.triggerErrorAlert(err.error.message);
      }
      }
    )

  }
}
