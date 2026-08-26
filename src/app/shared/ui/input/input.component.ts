import {Component, input} from '@angular/core';
import {AbstractControl, ReactiveFormsModule} from '@angular/forms';
import {AlertCircle, CalendarClock, CalendarX, Clock, LucideAngularModule, ServerCrash} from 'lucide-angular';

@Component({
  selector: 'app-input',
  imports: [
    ReactiveFormsModule,
    LucideAngularModule
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
  protected readonly ServerCrash = ServerCrash;
  protected readonly CalendarX = CalendarX;
  protected readonly AlertCircle = AlertCircle;
  protected readonly CalendarClock = CalendarClock;
  protected readonly Clock = Clock;
}
