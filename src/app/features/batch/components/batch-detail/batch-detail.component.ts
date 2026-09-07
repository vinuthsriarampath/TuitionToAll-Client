import {Component, input} from '@angular/core';
import {BatchStatus} from '@features/batch/enums/batch-status';
import {BadgeComponent, CardHeaderComponent, CardShellComponent} from '@shared/ui';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-batch-detail',
  imports: [
    CardShellComponent,
    CardHeaderComponent,
    BadgeComponent,
    DatePipe
  ],
  templateUrl: './batch-detail.component.html',
  styleUrl: './batch-detail.component.css'
})
export class BatchDetailComponent {
  batchId = input.required<number>();
  batchName = input.required<string>();
  batchStartDate = input.required<string>();
  batchStartTime = input.required<string>();
  batchStatus = input.required<BatchStatus>();

}
