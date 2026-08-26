import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function isFutureDate(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null; // important (let required handle empty)

    const selectedDate = new Date(control.value);
    const now = new Date();
    return selectedDate > now
      ? null
      : {
        isFutureDate: {
          message: 'Date must be in the future'
        }
      };
  };
}

export function isPresentFutureDate(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;

    const selectedDate = new Date(control.value);
    const now = new Date();
    return selectedDate >= now
      ? null
      : {
        isPresentFutureDate: {
          message: 'Date must be in the present or future'
        }
      };
  };
}
