import {Component, input} from '@angular/core';
import {AbstractControl, ReactiveFormsModule} from '@angular/forms';

export type SelectOption = { label: string; value: any };

@Component({
  selector: 'app-select',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css'
})
export class SelectComponent {

  control = input.required<AbstractControl | null>();

  id = input.required<string>();

  label = input.required<string>();

  options = input.required<SelectOption[]>();

  placeholder = input<string>('Select an option');

  required = input<boolean>(false);

  // normalize option rendering
  getLabel(opt: SelectOption) {
    return typeof opt === 'object' ? opt.label : opt;
  }

  getValue(opt: SelectOption) {
    return typeof opt === 'object' ? opt.value : opt;
  }
}
