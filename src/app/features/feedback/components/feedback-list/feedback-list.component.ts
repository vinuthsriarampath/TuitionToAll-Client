import {Component, input, output} from '@angular/core';
import {FeedbackResponse} from '@features/feedback/dto/responses/feedback-response';
import {CardShellComponent} from '@shared/ui';
import {FeedbackCardComponent} from '@features/feedback/components/feedback-card/feedback-card.component';
import {NoContentComponent} from '@shared/components/no-content/no-content.component';
import {MatPaginator, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-feedback-list',
  imports: [
    CardShellComponent,
    FeedbackCardComponent,
    NoContentComponent,
    MatPaginator
  ],
  templateUrl: './feedback-list.component.html',
  styleUrl: './feedback-list.component.css'
})
export class FeedbackListComponent {
  feedbacks = input.required<FeedbackResponse[]>();
  pageIndex = input<number>(0);
  pageSize = input<number>(5);
  totalElements = input<number>(0);

  pageChange = output<PageEvent>();


  protected onPageChange(event:PageEvent){
    this.pageChange.emit(event);
  }
}
