import {Component, input} from '@angular/core';
import {CardShellComponent} from '@shared/ui';

@Component({
  selector: 'app-stat-card',
  imports: [
    CardShellComponent
  ],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.css'
})
export class StatCardComponent {
  title = input.required<string>();

  value = input.required<string | number>();
}
