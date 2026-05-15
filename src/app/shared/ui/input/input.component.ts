import {Component, input} from '@angular/core';
import {AbstractControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {

  control = input.required<AbstractControl | null>();

  id = input.required<string>();

  label = input.required<string>();

  placeholder = input<string>('');

  required = input<boolean>(false);

  type = input<string>('text');
}
