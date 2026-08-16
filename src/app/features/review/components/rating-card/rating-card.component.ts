import {Component, input} from '@angular/core';
import {CardShellComponent} from "@shared/ui";
import {DecimalPipe} from "@angular/common";
import {LucideAngularModule, Star, StarHalf, Users} from "lucide-angular";
import {Course} from '@features/course/dtos/response/course';

@Component({
  selector: 'app-rating-card',
    imports: [
        CardShellComponent,
        DecimalPipe,
        LucideAngularModule
    ],
  templateUrl: './rating-card.component.html',
  styleUrl: './rating-card.component.css'
})
export class RatingCardComponent {
  avgRating = input.required<number>();
  totalRatings = input.required<number>();


  protected readonly Star = Star;
  protected readonly StarHalf = StarHalf;
  protected readonly Users = Users;
}
