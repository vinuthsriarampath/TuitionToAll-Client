import {Component, inject, input, OnInit, output} from '@angular/core';
import {CardShellComponent} from "@shared/ui";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {LucideAngularModule, Send, Star} from "lucide-angular";
import {ReviewCreateRequest} from '@features/review/dtos/request/review-create-request';
import {AlertService} from '@core/services/alerts/alert.service';
import {ReviewService} from '@features/review/service/review/review.service';
import {ReviewEligibilityResponse} from '@features/review/dtos/response/review-eligibility-response';

@Component({
  selector: 'app-review-create-card',
    imports: [
        CardShellComponent,
        FormsModule,
        LucideAngularModule,
        ReactiveFormsModule
    ],
  templateUrl: './review-create-card.component.html',
  styleUrl: './review-create-card.component.css'
})
export class ReviewCreateCardComponent implements OnInit{

  courseId = input.required<number>();
  reviewEligibility = input.required<ReviewEligibilityResponse>();
  loadReviews = output<void>();
  reviewEligibilityCheck = output<void>();

  protected form!: FormGroup;
  protected submitting: boolean = false;
  protected hoverRating: number = 0;

  private readonly formBuilder:FormBuilder = inject(FormBuilder);
  private readonly alertService:AlertService = inject(AlertService);
  private readonly reviewService:ReviewService = inject(ReviewService);

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
      review: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]]
    });
  }

  protected setRating(rating: number): void {
    this.form.patchValue({ rating });
    this.form.get('rating')?.markAsTouched();
  }

  protected setHoverRating(rating: number): void {
    this.hoverRating = rating;
  }

  protected clearHoverRating(): void {
    this.hoverRating = 0;
  }

  protected submitReview(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;
    const createReviewRequest  = new ReviewCreateRequest();
    createReviewRequest.courseId = this.courseId();
    createReviewRequest.rating = this.form.value.rating;
    createReviewRequest.review = this.form.value.review;

    this.reviewService.createReview(createReviewRequest).subscribe({
      next: () => {
        this.alertService.triggerSuccessAlert('Thank you! Your review has been submitted.');
        this.submitting = false;
        this.form.reset({ rating: 0, review: '' });
        this.reviewEligibilityCheck.emit();
        this.loadReviews.emit();
      },
      error: () => {
        this.alertService.triggerErrorAlert('Failed to submit your review.');
        this.submitting = false;
      }
    });
  }



  protected readonly Send = Send;
  protected readonly Star = Star;
}
