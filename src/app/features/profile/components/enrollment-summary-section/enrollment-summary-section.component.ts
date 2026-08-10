import {Component, input} from '@angular/core';
import {Course} from '@features/course/dtos/response/course';
import {Batch} from '@features/batch/dtos/response/batch';
import {CardShellComponent, InfoRowComponent} from '@shared/ui';
import {DatePipe, DecimalPipe, TitleCasePipe} from '@angular/common';
import {LucideAngularModule, ShieldCheck} from 'lucide-angular';

@Component({
  selector: 'app-enrollment-summary-section',
  imports: [
    CardShellComponent,
    DatePipe,
    DecimalPipe,
    InfoRowComponent,
    LucideAngularModule,
    TitleCasePipe
  ],
  templateUrl: './enrollment-summary-section.component.html',
  styleUrl: './enrollment-summary-section.component.css'
})
export class EnrollmentSummarySectionComponent {
  course = input.required<Course>();
  selectedBatch = input.required<Batch>();
  protected readonly ShieldCheck = ShieldCheck;
}
