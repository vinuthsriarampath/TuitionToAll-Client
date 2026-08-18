import {Component, inject, input, OnInit} from '@angular/core';
import {Course} from '@features/course/dtos/response/course';
import {FeedbackResponse} from '@features/feedback/dto/responses/feedback-response';
import {FeedbackService} from '@features/feedback/services/feedback/feedback.service';
import {AlertService} from '@core/services/alerts/alert.service';
import {PaginationRequest} from '@shared/utils/requests/PaginationRequest';
import {PageEvent} from '@angular/material/paginator';
import {CardHeaderComponent, CardShellComponent} from '@shared/ui';
import {FeedbackListComponent} from '@features/feedback/components/feedback-list/feedback-list.component';

@Component({
  selector: 'app-course-feedback-section',
  imports: [
    CardShellComponent,
    CardHeaderComponent,
    FeedbackListComponent
  ],
  templateUrl: './course-feedback-section.component.html',
  styleUrl: './course-feedback-section.component.css'
})
export class CourseFeedbackSectionComponent implements OnInit{
  course = input.required<Course>();

  protected feedbacks:FeedbackResponse[] = [];
  protected loading:boolean = false;

  private readonly feedbackService:FeedbackService = inject(FeedbackService);
  private readonly alertService:AlertService = inject(AlertService);

  protected pageIndex:number = 0;
  protected pageSize:number = 10
  protected totalElements:number = 0;

  ngOnInit(): void {
      this.loadFeedbacks();
  }

  protected loadFeedbacks = ():void => {
    this.triggerLoading();
    const pagination = new PaginationRequest(this.pageIndex, this.pageSize, 'DESC', ['created_date']);
    this.feedbackService.getFeedbacks(this.course().id,pagination).subscribe({
      next: res => {
        if(res.data){
          this.feedbacks = res.data;
          this.pageIndex = res.page ?? 0;
          this.pageSize = res.size ?? 10;
          this.totalElements = res.totalElements ?? 0;
        }
        this.triggerLoading();
      },
      error: () => {
        this.alertService.triggerErrorAlert("Failed to load feedbacks. Please try again later.");
        this.triggerLoading();
      }
    })
  }

  protected triggerLoading():void {
    this.loading = !this.loading;
  }

  protected onPageChange = (event:PageEvent):void => {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadFeedbacks();
  }


}
