import {Component, input, output} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {FilterFieldConfig} from '@shared/utils/config/filter-config';
import {CardShellComponent, InputComponent, SelectComponent} from '@shared/ui';
import {ArrowUpDown, LucideAngularModule} from 'lucide-angular';
import {MatTooltip} from '@angular/material/tooltip';
import {TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-filter-toolbar',
  imports: [
    ReactiveFormsModule,
    SelectComponent,
    InputComponent,
    LucideAngularModule,
    MatTooltip,
    TitleCasePipe,
    CardShellComponent
  ],
  templateUrl: './filter-toolbar.component.html',
  styleUrl: './filter-toolbar.component.css'
})
export class FilterToolbarComponent {
  formGroup = input.required<FormGroup>();
  fields = input.required<FilterFieldConfig[]>();
  sortDirection = input.required<string>();

  onSortDirectionChange = output<void>();
  onClearFilters = output<void>();

  protected readonly ArrowUpDown = ArrowUpDown;
}
