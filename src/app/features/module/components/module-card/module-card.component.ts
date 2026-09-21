import {Component, computed, input} from '@angular/core';
import {ModuleStatus} from '@features/module/enums/ModuleStatus';
import {CardShellComponent} from '@shared/ui';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';
import {LockKeyhole, LucideAngularModule} from 'lucide-angular';
import {ModuleBadgeComponent} from '@features/module/components/module-badge/module-badge.component';

@Component({
  selector: 'app-module-card',
  imports: [
    CardShellComponent,
    NgOptimizedImage,
    RouterLink,
    LucideAngularModule,
    ModuleBadgeComponent
  ],
  templateUrl: './module-card.component.html',
  styleUrl: './module-card.component.css'
})
export class ModuleCardComponent {
  moduleId = input.required<number>();
  moduleName = input.required<string>()
  moduleStatus = input.required<ModuleStatus>();
  lockModuleAccess = input<boolean>(true);

  isLocked = computed(() => this.lockModuleAccess() && this.moduleStatus() === 'LOCKED');
  protected readonly LockKeyhole = LockKeyhole;
}
