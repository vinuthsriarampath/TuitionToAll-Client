import {Component, input} from '@angular/core';
import {FeedbackResponse} from '@features/feedback/dto/responses/feedback-response';
import {CardShellComponent} from '@shared/ui';
import {DatePipe, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-feedback-card',
  imports: [
    CardShellComponent,
    NgOptimizedImage,
    DatePipe
  ],
  templateUrl: './feedback-card.component.html',
  styleUrl: './feedback-card.component.css'
})
export class FeedbackCardComponent {
  feedback = input.required<FeedbackResponse>();

  protected expandedFeedbacks: Record<number, boolean> = {};

  toggleExpand(feedbackId: number): void {
    this.expandedFeedbacks[feedbackId] = !this.expandedFeedbacks[feedbackId];
  }
}
