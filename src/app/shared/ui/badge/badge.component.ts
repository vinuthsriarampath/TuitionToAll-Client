import {Component, computed, input} from '@angular/core';
import {NgClass} from '@angular/common';
import {LucideAngularModule, LucideIconData} from 'lucide-angular';

type BadgeVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'violet';

@Component({
  selector: 'app-badge',
  imports: [
    NgClass,
    LucideAngularModule
  ],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.css'
})
export class BadgeComponent {

  text = input.required<string>();

  variant = input<BadgeVariant>('primary');

  icon = input<LucideIconData>();

  protected classes = computed(() => {
    return {
      'batch-primary': this.variant() === 'primary',
      'batch-secondary': this.variant() === 'secondary',
      'batch-success': this.variant() === 'success',
      'batch-danger': this.variant() === 'danger',
      'batch-warning': this.variant() === 'warning',
      'batch-info': this.variant() === 'info',
      'batch-violet': this.variant() === 'violet',
    };
  });
}
