import {Component, input} from '@angular/core';

@Component({
  selector: 'app-card-header',
  imports: [],
  templateUrl: './card-header.component.html',
  styleUrl: './card-header.component.css'
})
export class CardHeaderComponent {

  title = input.required<string>();
  description = input<string>('');
}
