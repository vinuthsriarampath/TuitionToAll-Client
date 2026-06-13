import {Component, input} from '@angular/core';

@Component({
  selector: 'app-loader-overlay',
  imports: [],
  templateUrl: './loader-overlay.component.html',
  styleUrl: './loader-overlay.component.css'
})
export class LoaderOverlayComponent {
  title = input<string>('Loading');
  description = input<string>('Please wait...');
}
