import {Component} from '@angular/core';
import {BadgeComponent, CardHeaderComponent, CardShellComponent} from "@shared/ui";

@Component({
  selector: 'app-schedule-lecture-card-skeleton',
  imports: [
    CardHeaderComponent,
    CardShellComponent,
    BadgeComponent
  ],
  templateUrl: './schedule-lecture-card-skeleton.component.html',
  styleUrl: './schedule-lecture-card-skeleton.component.css'
})
export class ScheduleLectureCardSkeletonComponent {

}
