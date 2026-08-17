import {Component, inject} from '@angular/core';
import {PageLayoutComponent} from '@core/layouts';
import {ActivatedRoute} from '@angular/router';
import {Course} from '@features/course/dtos/response/course';
import {LucideAngularModule, User, Users} from 'lucide-angular';
import {Batch} from '@features/batch/dtos/response/batch';
import {
  SelectedCourseSectionComponent
} from '@features/student_batch_enrollment/component/selected-course-section/selected-course-section.component';
import {
  EnrollmentSummarySectionComponent
} from '@features/profile/components/enrollment-summary-section/enrollment-summary-section.component';
import {
  BatchSelectionSectionComponent
} from '@features/student_batch_enrollment/component/batch-selection-section/batch-selection-section.component';
import {UserService} from '@features/user/services/user/user.service';
import {
  StudentEnrollmentService
} from '@features/student_batch_enrollment/service/student-enrollment/student-enrollment.service';
import {
  EnrollmentEligibilityCheckRequest
} from '@features/student_batch_enrollment/dto/request/enrollment-eligibility-check-request/enrollment-eligibility-check-request';
import {AlertService} from '@core/services/alerts/alert.service';
import {
  EnrollmentEligibilityResponse
} from '@features/student_batch_enrollment/dto/response/enrollment-eligibility-response/enrollment-eligibility-response';
import {EnrollmentEligibilityReason} from '@features/student_batch_enrollment/enums/EnrollmentEligibilityReason';
import {
  CourseReviewSectionComponent
} from '@features/profile/components/course-review-section/course-review-section.component';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-course-checkout',
  imports: [
    PageLayoutComponent,
    LucideAngularModule,
    SelectedCourseSectionComponent,
    EnrollmentSummarySectionComponent,
    BatchSelectionSectionComponent,
    CourseReviewSectionComponent,
    NgClass
  ],
  templateUrl: './course-checkout.component.html',
  styleUrl: './course-checkout.component.css'
})
export class CourseCheckoutComponent {
  private readonly route = inject(ActivatedRoute);
  course:Course = this.route.snapshot.data['course'];
  protected batches:Batch[] = [];
  protected selectedBatch!:Batch;
  protected enrollmentEligibility!:EnrollmentEligibilityResponse;
  protected eligibilityCheckLoading:boolean = false;

  protected readonly userService:UserService = inject(UserService);
  protected readonly enrollmentService:StudentEnrollmentService = inject(StudentEnrollmentService);
  protected readonly alertService:AlertService = inject(AlertService);

  protected selectBatch = (batch:Batch):void => {
    this.selectedBatch = batch;
    this.checkEnrollEligibility();
  }

  protected checkEnrollEligibility = ()=> {
    this.triggerEligibilityCheckLoading();
    if(this.userService.getCurrentUserRole() === 'student'){
      const request = new EnrollmentEligibilityCheckRequest();
      request.courseId = this.course.id ?? -1;
      request.batchId = this.selectedBatch.id;
      this.enrollmentService.checkEnrollmentEligibility(request).subscribe({
        next: (res) => {
          if(res.data){
            this.enrollmentEligibility = res.data;
          }
          this.triggerEligibilityCheckLoading();
        },
        error: () => {
          this.enrollmentEligibility = new EnrollmentEligibilityResponse();
          this.enrollmentEligibility.canEnroll=false;
          this.enrollmentEligibility.reason=EnrollmentEligibilityReason.CHECK_FAILED;
          this.alertService.triggerErrorAlert('Failed to check enrollment eligibility.');
          this.triggerEligibilityCheckLoading();
        }
      })
    }
  }

  protected get showSummarySidebar(): boolean {
    return !!(this.course?.id && this.selectedBatch);
  }

  private triggerEligibilityCheckLoading():void {
    this.eligibilityCheckLoading = !this.eligibilityCheckLoading;
  }

  protected readonly User = User;
  protected readonly Users = Users;
}
