import {Component, computed, input} from '@angular/core';
import {NgClass} from '@angular/common';

export type CardVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'indigo'
  | 'violet';

export type CardBorderStyle =
  | 'solid'
  | 'dashed'
  | 'dotted'
  | 'double'
  | 'none';

@Component({
  selector: 'app-card-shell',
  imports: [
    NgClass
  ],
  templateUrl: './card-shell.component.html',
  styleUrl: './card-shell.component.css'
})
export class CardShellComponent {

  variant = input<CardVariant>('primary');
  borderStyle = input<CardBorderStyle>('solid');

  protected classes = computed(() => ({
    // Colors
    'card-primary': this.variant() === 'primary',
    'card-secondary': this.variant() === 'secondary',
    'card-success': this.variant() === 'success',
    'card-warning': this.variant() === 'warning',
    'card-danger': this.variant() === 'danger',
    'card-info': this.variant() === 'info',
    'card-indigo': this.variant() === 'indigo',
    'card-violet': this.variant() === 'violet',

    // Border styles
    'card-border-solid': this.borderStyle() === 'solid',
    'card-border-dashed': this.borderStyle() === 'dashed',
    'card-border-dotted': this.borderStyle() === 'dotted',
    'card-border-double': this.borderStyle() === 'double',
    'card-border-none': this.borderStyle() === 'none',
  }));
}
