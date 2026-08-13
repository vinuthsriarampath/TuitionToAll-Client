import {Component, inject, input, OnInit, output} from '@angular/core';
import {Course} from '@features/course/dtos/response/course';
import {Batch} from '@features/batch/dtos/response/batch';
import {CardShellComponent, InfoRowComponent} from '@shared/ui';
import {DatePipe, DecimalPipe, TitleCasePipe} from '@angular/common';
import {AlertTriangle, LucideAngularModule, ShieldCheck} from 'lucide-angular';
import {
  StudentEnrollmentService
} from '@features/student_batch_enrollment/service/student-enrollment/student-enrollment.service';
import {EnrollmentRequest} from '@features/student_batch_enrollment/dto/request/enrollment-request/enrollment-request';
import {AlertService} from '@core/services/alerts/alert.service';
import {HttpErrorResponse} from '@angular/common/http';
import {
  EnrollmentEligibilityResponse
} from '@features/student_batch_enrollment/dto/response/enrollment-eligibility-response/enrollment-eligibility-response';
import {UserService} from '@features/profile/services/user/user.service';
import {EnrollmentEligibilityReason} from '@features/student_batch_enrollment/enums/EnrollmentEligibilityReason';

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
  batchEnrollEligibility = input.required<EnrollmentEligibilityResponse>();
  eligibilityCheckLoading = input.required<boolean>();
  checkEligibility = output<void>();

  protected enrollmentLoading:boolean =  false ;

  private readonly enrollmentService:StudentEnrollmentService = inject(StudentEnrollmentService);
  private readonly alertService:AlertService = inject(AlertService);
  protected readonly userService:UserService = inject(UserService);


  protected enrollStudent() {
    if(this.userService.getCurrentUserRole() !== 'student') return;
    this.triggerEnrollmentLoading();
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
          this.triggerEnrollmentLoading();
          this.checkEligibility.emit();
        },
        error: async (error: HttpErrorResponse) => {
          let message = 'Failed to enroll student to course.';
          if (error.error instanceof Blob) {
            try {
              const text = await error.error.text();
              if (text) {
                const errorBody = JSON.parse(text);
                message = errorBody.message ?? message;
              }
            } catch {
              message = 'Something went wrong, Failed to parse error message.';
            }
          } else if (error.error?.message) {
            message = error.error.message;
          }
          this.alertService.triggerErrorAlert(message);
          this.triggerEnrollmentLoading();
        }
      });

  }

  private triggerEnrollmentLoading():void{
    this.enrollmentLoading = !this.enrollmentLoading;
  }
  protected readonly ShieldCheck = ShieldCheck;
  protected readonly AlertTriangle = AlertTriangle;
  protected readonly EnrollmentEligibilityReason = EnrollmentEligibilityReason;
}
