import {Component, inject} from '@angular/core';
import {PageLayoutComponent} from '@core/layouts';
import {ActivatedRoute} from '@angular/router';
import {Course} from '@features/course/dtos/response/course';
import {LucideAngularModule, User, Users} from 'lucide-angular';
import {Batch} from '@features/batch/dtos/response/batch';
import {
  SelectedCourseSectionComponent
} from '@features/profile/components/selected-course-section/selected-course-section.component';
import {
  EnrollmentSummarySectionComponent
} from '@features/profile/components/enrollment-summary-section/enrollment-summary-section.component';
import {
  BatchSelectionSectionComponent
} from '@features/profile/components/batch-selection-section/batch-selection-section.component';

@Component({
  selector: 'app-course-checkout',
  imports: [
    PageLayoutComponent,
    LucideAngularModule,
    SelectedCourseSectionComponent,
    EnrollmentSummarySectionComponent,
    BatchSelectionSectionComponent
  ],
  templateUrl: './course-checkout.component.html',
  styleUrl: './course-checkout.component.css'
})
export class CourseCheckoutComponent {
  private readonly route = inject(ActivatedRoute);
  course:Course = this.route.snapshot.data['course'];
  protected batches:Batch[] = [];
  protected selectedBatch!:Batch;


  protected selectBatch = (batch:Batch):void => {
    this.selectedBatch = batch;
  }

  protected readonly User = User;
  protected readonly Users = Users;
}
