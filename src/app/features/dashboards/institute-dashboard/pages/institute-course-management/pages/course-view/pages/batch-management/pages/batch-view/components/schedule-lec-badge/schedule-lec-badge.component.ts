import {Component, input} from '@angular/core';
import {ScheduleLectureStatus} from '../../../../../../../../../../../../../core/enums/ScheduleLectureStatus';
import {BadgeComponent} from '../../../../../../../../../../../../../shared/ui/badge/badge.component';

@Component({
  selector: 'app-schedule-lec-badge',
  imports: [
    BadgeComponent
  ],
  templateUrl: './schedule-lec-badge.component.html',
  styleUrl: './schedule-lec-badge.component.css'
})
export class ScheduleLecBadgeComponent {
  status = input.required<ScheduleLectureStatus>();
  protected readonly ScheduleLectureStatus = ScheduleLectureStatus;
}
