import {Component, input} from '@angular/core';
import {ModuleStatus} from '../../enums/ModuleStatus';
import {BadgeComponent} from '../../../../shared/ui/badge/badge.component';

@Component({
  selector: 'app-module-badge',
  imports: [
    BadgeComponent
  ],
  templateUrl: './module-badge.component.html',
  styleUrl: './module-badge.component.css'
})
export class ModuleBadgeComponent {
  status = input.required<ModuleStatus>();

  protected readonly ModuleStatus = ModuleStatus;
}
