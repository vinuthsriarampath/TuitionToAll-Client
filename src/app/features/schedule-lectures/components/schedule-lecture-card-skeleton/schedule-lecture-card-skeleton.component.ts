import { Component } from '@angular/core';
import {BadgeComponent, CardHeaderComponent, CardShellComponent} from "@shared/ui";
import {DatePipe} from "@angular/common";
import {
    ScheduleLecBadgeComponent
} from "@features/schedule-lectures/components/schedule-lec-badge/schedule-lec-badge.component";

@Component({
  selector: 'app-schedule-lecture-card-skeleton',
  imports: [
    CardHeaderComponent,
    CardShellComponent,
    DatePipe,
    ScheduleLecBadgeComponent,
    BadgeComponent
  ],
  templateUrl: './schedule-lecture-card-skeleton.component.html',
  styleUrl: './schedule-lecture-card-skeleton.component.css'
})
export class ScheduleLectureCardSkeletonComponent {

}
