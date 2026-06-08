import {Component, input} from '@angular/core';
import {ChapterStatus} from '../../enums/ChapterStatus';
import {BadgeComponent} from '../../../../shared/ui/badge/badge.component';
import {ModuleStatus} from '../../../module/enums/ModuleStatus';

@Component({
  selector: 'app-chapter-badge',
  imports: [
    BadgeComponent
  ],
  templateUrl: './chapter-badge.component.html',
  styleUrl: './chapter-badge.component.css'
})
export class ChapterBadgeComponent {
  status = input.required<ChapterStatus>();
  protected readonly ChapterStatus = ChapterStatus;
  protected readonly ModuleStatus = ModuleStatus;
}
