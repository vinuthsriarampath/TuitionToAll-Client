import {Component, inject, input, OnInit} from '@angular/core';
import {Course} from '@features/course/dtos/response/course';
import {Batch} from '@features/batch/dtos/response/batch';
import {CardShellComponent, InfoRowComponent} from '@shared/ui';
import {DatePipe, DecimalPipe, TitleCasePipe} from '@angular/common';
import {LucideAngularModule, ShieldCheck} from 'lucide-angular';
import {
  StudentEnrollmentService
} from '@features/student_batch_enrollment/service/student-enrollment/student-enrollment.service';
import {EnrollmentRequest} from '@features/student_batch_enrollment/dto/request/enrollment-request/enrollment-request';

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
export class EnrollmentSummarySectionComponent{
  course = input.required<Course>();
  selectedBatch = input.required<Batch>();

  private readonly enrollmentService:StudentEnrollmentService = inject(StudentEnrollmentService);


  protected enrollStudent() {
    const request: EnrollmentRequest = {
        courseId: this.course().id ?? -1,
        batchId: this.selectedBatch().id
      };
      this.enrollmentService.enrollStudentToCourse(request).subscribe({
        next: (blob: Blob) => {
          const url = window.URL.createObjectURL(blob);

          const anchor = document.createElement('a');

          anchor.href = url;
          anchor.download = 'invoice.pdf';

          anchor.click();

          window.URL.revokeObjectURL(url);
        },
        error: (error) => {
          console.log(error);
        }
      });

  }

  protected readonly ShieldCheck = ShieldCheck;
}
