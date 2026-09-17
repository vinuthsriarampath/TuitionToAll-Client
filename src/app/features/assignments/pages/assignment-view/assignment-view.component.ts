import {Component, inject, input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AssignmentService} from '@features/assignments/services/assignment/assignment.service';
import {AlertService} from '@core/services/alerts/alert.service';
import {environment} from "@env/environment.development";
import {AssignmentConfig} from '@features/assignments/pages/assignment-list/assignment-list.component';
import {AssignmentDetailedResponse} from '@features/assignments/dtos/response/assignment-detailed-response';
import {DatePipe, NgClass} from '@angular/common';
import {PageLayoutComponent} from '@core/layouts';
import {CardShellComponent} from '@shared/ui';
import {QuillViewComponent} from 'ngx-quill';
import {
  AssignmentSubmissionFormComponent
} from '@features/assignment-submission/components/assignment-submission-form/assignment-submission-form.component';
import {
  StudentAssignmentSubmissionListComponent
} from '@features/assignment-submission/components/student-assignment-submission-list/student-assignment-submission-list.component';

@Component({
  selector: 'app-assignment-view',
  imports: [
    DatePipe,
    NgClass,
    PageLayoutComponent,
    CardShellComponent,
    QuillViewComponent,
    AssignmentSubmissionFormComponent,
    StudentAssignmentSubmissionListComponent
  ],
  templateUrl: './assignment-view.component.html',
  styleUrl: './assignment-view.component.css'
})
export class AssignmentViewComponent implements OnInit{
  canSubmitAssignment = input<boolean>(false);

  protected assignment!: AssignmentDetailedResponse;
  protected config!: AssignmentConfig;

  protected isLoaded: boolean = false;
  protected loading: boolean = false;

  protected readonly environment = environment;

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly assignmentService = inject(AssignmentService);
  private readonly alertService = inject(AlertService);


  ngOnInit(): void {
    this.route.queryParams.subscribe(query => {
      const idParam = this.route.snapshot.paramMap.get('assignmentId');

      if (!query || !idParam) {
        this.router.navigate(['/404'], { skipLocationChange: true });
        return;
      }

      const id = Number(idParam);

      if (isNaN(id)) {
        this.router.navigate(['/404'], { skipLocationChange: true });
        return;
      }

      this.config = query as AssignmentConfig;
      this.loadAssignment(id);
    });
  }

  private loadAssignment(id: number): void {
    this.loading = true;

    this.assignmentService.getDetailedAssignmentById(id).subscribe({
      next: (res) => {
        if (res.data) {
          this.assignment = res.data;
          this.isLoaded = true;
        }
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.alertService.triggerErrorAlert(
          err.error?.message || 'Failed to load assignment'
        );
        this.router.navigate(['/404'], { skipLocationChange: true });
      }
    });
  }

  scrollToSubmission(): void {
    // Directly query the DOM element by ID
    const element = document.getElementById('submissionForm');

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
