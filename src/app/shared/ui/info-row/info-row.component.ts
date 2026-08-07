import {Component, input} from '@angular/core';

@Component({
  selector: 'app-info-row',
  imports: [],
  templateUrl: './info-row.component.html',
  styleUrl: './info-row.component.css'
})
export class InfoRowComponent {
  label = input.required<string>();

  value = input.required<string | number | undefined>();

  loading = input<boolean>(false);
}
