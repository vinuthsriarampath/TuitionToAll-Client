import {Component, inject, input, OnInit} from '@angular/core';
import {CardHeaderComponent, CardShellComponent} from '@shared/ui';
import {Course} from '@features/course/dtos/response/course';
import {LucideAngularModule, Users} from 'lucide-angular';
import {ReviewService} from '@features/review/service/review/review.service';
import {AlertService} from '@core/services/alerts/alert.service';
import {PaginationRequest} from '@shared/utils/requests/PaginationRequest';
import {BasicReviewResponse} from '@features/review/dtos/response/basic-review-response';
import {ReactiveFormsModule} from '@angular/forms';
import {PageEvent} from '@angular/material/paginator';
import {RatingCardComponent} from '@features/review/components/rating-card/rating-card.component';
import {ReviewEligibilityResponse} from '@features/review/dtos/response/review-eligibility-response';
import {ReviewCreateCardComponent} from '@features/review/components/review-create-card/review-create-card.component';
import {ReviewListComponent} from '@features/review/components/review-list/review-list.component';

@Component({
  selector: 'app-course-review-section',
  imports: [
    CardShellComponent,
    CardHeaderComponent,
    LucideAngularModule,
    ReactiveFormsModule,
    RatingCardComponent,
    ReviewCreateCardComponent,
    ReviewListComponent
  ],
  templateUrl: './course-review-section.component.html',
  styleUrl: './course-review-section.component.css'
})
export class CourseReviewSectionComponent implements OnInit{
  course = input.required<Course>();

  protected reviews:BasicReviewResponse[] = [];

  protected reviewEligibility!:ReviewEligibilityResponse;

  protected loading:boolean = false;

  protected pageIndex:number = 0;
  protected pageSize:number = 5;
  protected totalElements:number = 0;

  private readonly reviewService:ReviewService = inject(ReviewService);
  private readonly alertService = inject(AlertService);


  ngOnInit(): void {
    this.loadReviews();
    this.checkReviewEligibility();
  }

  protected loadReviews = ():void => {
    this.triggerLoading();
    const pagination = new PaginationRequest();
    pagination.page = this.pageIndex;
    pagination.size = this.pageSize;
    pagination.direction = 'DESC'
    pagination.sortBy=['created_date'];
    this.reviewService.getReviewsByCourseId(this.course().id, pagination).subscribe({
      next: (res) => {
        if(res.data){
          this.pageIndex = res.page ?? 0;
          this.pageSize = res.size ?? 10;
          this.totalElements = res.totalElements ?? 0;
          this.reviews = res.data;
        }
        this.triggerLoading();
      },
      error: () => {
        this.alertService.triggerErrorAlert('Failed to load reviews.');
        this.triggerLoading();
      }
    });
  }

  protected checkReviewEligibility = ():void =>{
    this.reviewService.checkReviewEligibility(this.course().id).subscribe({
      next: (res) => {
        if(res){
          this.reviewEligibility = res;
        }
      },
      error: () => {
        this.alertService.triggerErrorAlert('Failed to check review eligibility.');
      }
    });
  }

  private triggerLoading():void{
    this.loading = !this.loading;
  }

  protected onPageChange = ($event: PageEvent):void => {
    this.pageIndex = $event.pageIndex;
    this.pageSize = $event.pageSize;
    this.loadReviews();
  }
  protected readonly Users = Users;

}
