import {Component, inject, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {AlertService} from '@core/services/alerts/alert.service';
import {ApiResponse} from '@shared/utils/response/api-response';
import {MatDialog} from '@angular/material/dialog';
import {UpdateBatchDialogComponent} from '../../dialogs/update-batch-dialog/update-batch-dialog.component';
import {PageLayoutComponent} from '@core/layouts';
import {MatTab, MatTabContent, MatTabGroup} from '@angular/material/tabs';
import {LucideAngularModule} from 'lucide-angular';
import {ModuleSectionComponent} from '../../../module/components/module-section/module-section.component';
import {CardHeaderComponent, CardShellComponent} from '@shared/ui';
import {BatchService} from '@features/batch/services/batch/batch.service';
import {Batch} from '@features/batch/dtos/response/batch';
import {
  BatchStudentSectionComponent
} from '@features/student/components/batch-student-section/batch-student-section.component';

@Component({
  selector: 'app-batch-view',
  imports: [
    DatePipe,
    PageLayoutComponent,
    CardShellComponent,
    CardHeaderComponent,
    MatTabGroup,
    MatTab,
    MatTabContent,
    LucideAngularModule,
    ModuleSectionComponent,
    BatchStudentSectionComponent
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
      this.batchId = Number.parseInt(params.get('batchId') ?? '');
    });
    this.fetchBatchDetails(this.batchId);
  }

  private fetchBatchDetails(batchId:number):void{
      this.batchService.getBatchById(batchId).subscribe({
        next: (res:ApiResponse<Batch>) => {
          if(res.data){
            this.batch = res.data;
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
