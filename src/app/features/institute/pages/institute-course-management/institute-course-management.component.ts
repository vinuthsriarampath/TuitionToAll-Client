import {Component, inject} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {CurrencyPipe, NgClass, TitleCasePipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {ArrowUpDown, Eye, LucideAngularModule, X} from 'lucide-angular';
import {MatTooltip} from '@angular/material/tooltip';
import {PageLayoutComponent} from '@core/layouts';
import {Course} from '@features/course/dtos/response/course';
import {NoContentComponent} from '@shared/components/no-content/no-content.component';
import {CourseFilter} from '@features/course/dtos/request/course-filter';
import {FormsModule, NonNullableFormBuilder, ReactiveFormsModule} from '@angular/forms';
import {CardShellComponent, SelectOption} from '@shared/ui';
import {FilterFieldConfig} from '@shared/utils/config/filter-config';
import {FilterToolbarComponent} from '@shared/components/filter-toolbar/filter-toolbar.component';
import {BasePaginatedFilterComponent} from '@shared/utils/base/BasePaginatedFilterComponent';
import {CourseService} from '@features/course/services/course/course.service';
import {CourseCategory} from '@features/course/enums/course-category';
import {CourseLevel} from '@features/course/enums/course-level';
import {CourseLanguage} from '@features/course/enums/course-language';
import {CourseMode} from '@features/course/enums/course-mode';
import {CourseStatus} from '@features/course/enums/course-status';
import {PaginationRequest} from '@shared/utils/requests/PaginationRequest';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-institute-course-management',
  imports: [
    MatTableModule,
    NgClass,
    CurrencyPipe,
    MatPaginatorModule,
    RouterLink,
    LucideAngularModule,
    MatTooltip,
    PageLayoutComponent,
    NoContentComponent,
    FormsModule,
    ReactiveFormsModule,
    CardShellComponent,
    FilterToolbarComponent,
    TitleCasePipe,
  ],
  templateUrl: './institute-course-management.component.html',
  styleUrl: './institute-course-management.component.css'
})
export class InstituteCourseManagementComponent extends BasePaginatedFilterComponent<Course, CourseFilter>{
  private readonly courseService = inject(CourseService);
  private readonly fb = inject(NonNullableFormBuilder);

  protected displayedColumns: string[] = ['id', 'title', 'category', 'durationInHours', 'price', 'status', 'actions'];
  protected sortByFields = ['created_date'];

  protected readonly filterForm = this.fb.group({
    title: [''],
    category: [undefined as CourseCategory | undefined],
    level: [undefined as CourseLevel | undefined],
    language: [undefined as CourseLanguage | undefined],
    mode: [undefined as CourseMode | undefined],
    status: [undefined as CourseStatus | undefined]
  });

  protected readonly categoryOptions: SelectOption[] = Object.values(CourseCategory).map(v => ({ label: v, value: v }));
  protected readonly levelOptions: SelectOption[] = Object.values(CourseLevel).map(v => ({ label: v, value: v }));
  protected readonly languageOptions: SelectOption[] = Object.values(CourseLanguage).map(v => ({ label: v, value: v }));
  protected readonly modeOptions: SelectOption[] = Object.values(CourseMode).map(v => ({ label: v, value: v }));
  protected readonly statusOptions: SelectOption[] = Object.values(CourseStatus).map(v => ({ label: v, value: v }));

  protected readonly filterFields: FilterFieldConfig[] = [
    { key: 'title', label: 'Course Title', type: 'text', placeholder: 'Search by title...', colSpan: 'lg:col-span-2' },
    { key: 'category', label: 'Category', type: 'select', options: this.categoryOptions, placeholder: 'All Categories' },
    { key: 'level', label: 'Level', type: 'select', options: this.levelOptions, placeholder: 'All Levels' },
    { key: 'language', label: 'Language', type: 'select', options: this.languageOptions, placeholder: 'All Languages' },
    { key: 'mode', label: 'Mode', type: 'select', options: this.modeOptions, placeholder: 'All Modes' },
    { key: 'status', label: 'Status', type: 'select', options: this.statusOptions, placeholder: 'All Statuses' }
  ];

  protected fetchApiData(pagination: PaginationRequest, filter: CourseFilter): Observable<any> {
    return this.courseService.getPaginatedCoursesForCurrentInstitute(pagination, filter);
  }

  protected mapFormToFilter(formValues: Record<string, any>): CourseFilter {
    return {
      title: formValues['title'] || undefined,
      category: formValues['category'] || undefined,
      level: formValues['level'] || undefined,
      language: formValues['language'] || undefined,
      mode: formValues['mode'] || undefined,
      status: formValues['status'] || undefined
    };
  }

  protected readonly Eye = Eye;
  protected readonly Object = Object;
  protected readonly ArrowUpDown = ArrowUpDown;
  protected readonly X = X;
}
