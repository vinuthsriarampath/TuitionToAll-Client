import {Component, input} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {FilterFieldConfig} from '@shared/utils/config/filter-config';
import {InputComponent, SelectComponent} from '@shared/ui';

@Component({
  selector: 'app-filter-toolbar',
  imports: [
    ReactiveFormsModule,
    SelectComponent,
    InputComponent
  ],
  templateUrl: './filter-toolbar.component.html',
  styleUrl: './filter-toolbar.component.css'
})
export class FilterToolbarComponent {
  formGroup = input.required<FormGroup>();
  fields = input.required<FilterFieldConfig[]>();
}
