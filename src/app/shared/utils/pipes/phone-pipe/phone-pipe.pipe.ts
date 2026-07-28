import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipePipe implements PipeTransform {

  transform(value: string | number | null | undefined, ...args: unknown[]): unknown {
    if (value == null) {
      return '';
    }

    const phone = value.toString();

    // Sri Lankan example: 0771234567 -> 077 123 4567
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
  }

}
