import {Component, input} from '@angular/core';
import {DatePipe, NgOptimizedImage} from "@angular/common";
import {LucideAngularModule, Star, StarHalf} from "lucide-angular";
import {BasicReviewResponse} from '@features/review/dtos/response/basic-review-response';

@Component({
  selector: 'app-review-card',
    imports: [
        DatePipe,
        LucideAngularModule,
        NgOptimizedImage
    ],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.css'
})
export class ReviewCardComponent {

  review = input.required<BasicReviewResponse>();

  protected expandedReviews: Record<number, boolean> = {};


  protected toggleExpand(reviewId: number): void {
    this.expandedReviews[reviewId] = !this.expandedReviews[reviewId];
  }

  protected readonly Star = Star;
  protected readonly StarHalf = StarHalf;
}
