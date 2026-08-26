import {Component, inject, input, OnInit, output} from '@angular/core';
import {Batch} from '@features/batch/dtos/response/batch';
import {BatchService} from '@features/batch/services/batch/batch.service';
import {AlertService} from '@core/services/alerts/alert.service';
import {BadgeComponent, CardHeaderComponent, CardShellComponent} from '@shared/ui';
import {DatePipe, LowerCasePipe, NgClass} from '@angular/common';
import {Calendar, Clock, LucideAngularModule, Users} from 'lucide-angular';

@Component({
  selector: 'app-batch-selection-section',
  imports: [
    BadgeComponent,
    CardHeaderComponent,
    CardShellComponent,
    DatePipe,
    LowerCasePipe,
    LucideAngularModule,
    NgClass
  ],
  templateUrl: './batch-selection-section.component.html',
  styleUrl: './batch-selection-section.component.css'
})
export class BatchSelectionSectionComponent implements OnInit {
  courseId = input.required<number>();
  selectBatch = output<Batch>();
  selectedBatch!:Batch;
  protected batches:Batch[] = [];
  protected loading:boolean = false;

  private readonly batchService = inject(BatchService);
  private readonly alertService: AlertService = inject(AlertService);

  ngOnInit(): void {
      this.loadEnrollableBatches();
  }

  protected batchSelect(batch: Batch) {
    this.selectedBatch = batch;
    this.selectBatch.emit(batch);
  }

  private loadEnrollableBatches(): void {
    this.triggerLoading();
    if(this.courseId()){
      this.batchService.getEnrollableBatchesOfCourse(this.courseId()).subscribe({
        next: (response) => {
          this.batches = response.data ?? [];
          if (this.batches.length > 0) this.batchSelect(this.batches[0]);
          this.triggerLoading();
        },
        error: () => {
          this.alertService.triggerErrorAlert('Failed to load enrollable batches.');
          this.triggerLoading();
        }
      });
    }
  }

  private triggerLoading():void{
    this.loading = !this.loading;
  }

  protected readonly Calendar = Calendar;
  protected readonly Clock = Clock;
  protected readonly Users = Users;
}
