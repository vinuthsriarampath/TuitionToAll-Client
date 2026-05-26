import {Component, input} from '@angular/core';
import {AbstractControl} from '@angular/forms';

export type CheckboxOption = {
  label: string;
  value: any;
};

@Component({
  selector: 'app-checkbox',
  imports: [],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.css'
})
export class CheckboxComponent {
  control = input.required<AbstractControl | null>();

  id = input.required<string>();

  label = input.required<string>();

  options = input.required<CheckboxOption[]>();

  required = input<boolean>(false);

  multiple = input<boolean>(false);

  showContainer = input<boolean>(false);

  // =========================
  // SINGLE SELECT
  // =========================

  onSingleChange(event: Event, value: any): void {

    const checked = (event.target as HTMLInputElement).checked;

    if (checked) {
      this.control()?.setValue(value);
    } else {
      this.control()?.setValue(null);
    }

    this.control()?.markAsTouched();
    this.control()?.updateValueAndValidity();
  }

  // =========================
  // MULTIPLE SELECT
  // =========================

  onMultipleChange(event: Event, value: any): void {

    const checked = (event.target as HTMLInputElement).checked;

    let values: any[] = this.control()?.value || [];

    if (!Array.isArray(values)) {
      values = [];
    }

    if (checked) {

      if (!values.includes(value)) {
        values.push(value);
      }

    } else {

      values = values.filter(v => v !== value);

    }

    this.control()?.setValue(values);
    this.control()?.markAsTouched();
    this.control()?.updateValueAndValidity();
  }

  isChecked(value: any): boolean {

    if (this.multiple()) {

      const values = this.control()?.value || [];

      return Array.isArray(values) && values.includes(value);
    }

    return this.control()?.value === value;
  }

  hasError(): boolean {
    return !!(
      this.control()?.invalid &&
      this.control()?.touched
    );
  }

  // =========================
  // HELPERS
  // =========================

  getLabel(opt: CheckboxOption): string {
    return opt.label;
  }

  getValue(opt: CheckboxOption): any {
    return opt.value;
  }
}
