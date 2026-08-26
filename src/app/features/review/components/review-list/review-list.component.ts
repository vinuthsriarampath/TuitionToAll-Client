import {Component, input, output} from '@angular/core';
import {CardShellComponent} from "@shared/ui";
import {LucideAngularModule} from "lucide-angular";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {NoContentComponent} from "@shared/components/no-content/no-content.component";
import {BasicReviewResponse} from '@features/review/dtos/response/basic-review-response';
import {ReviewCardComponent} from '@features/review/components/review-card/review-card.component';

@Component({
  selector: 'app-review-list',
  imports: [
    CardShellComponent,
    LucideAngularModule,
    MatPaginator,
    NoContentComponent,
    ReviewCardComponent
  ],
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.css'
})
export class ReviewListComponent {

  reviews = input.required<BasicReviewResponse[]>();
  totalElements = input.required<number>();
  pageIndex = input.required<number>();
  pageSize = input.required<number>();

  pageChange = output<PageEvent>();


  protected onPageChange(event:PageEvent){
    this.pageChange.emit(event);
  }
}
