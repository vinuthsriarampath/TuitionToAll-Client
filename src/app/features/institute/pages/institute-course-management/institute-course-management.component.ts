import {Component, inject, OnInit, signal} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {AlertService} from '@core/services/alerts/alert.service';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {CurrencyPipe, NgClass} from '@angular/common';
import {RouterLink} from '@angular/router';
import {ArrowUpDown, Eye, LucideAngularModule} from 'lucide-angular';
import {MatTooltip} from '@angular/material/tooltip';
import {PageLayoutComponent} from '@core/layouts';
import {Course} from '@features/course/dtos/response/course';
import {CourseService} from '@features/course/services/course/course.service';
import {NoContentComponent} from '@shared/components/no-content/no-content.component';
import {PaginationRequest} from '@shared/utils/requests/PaginationRequest';
import {toObservable} from '@angular/core/rxjs-interop';
import {combineLatest, debounceTime, distinctUntilChanged, startWith, switchMap} from 'rxjs';
import {CourseCategory} from '@features/course/enums/course-category';
import {CourseLevel} from '@features/course/enums/course-level';
import {CourseLanguage} from '@features/course/enums/course-language';
import {CourseMode} from '@features/course/enums/course-mode';
import {CourseStatus} from '@features/course/enums/course-status';
import {CourseFilter} from '@features/course/dtos/request/course-filter';
import {FormsModule, NonNullableFormBuilder, ReactiveFormsModule} from '@angular/forms';
import {CardShellComponent} from '@shared/ui';
import {FilterFieldConfig} from '@shared/utils/config/filter-config';
import {FilterToolbarComponent} from '@shared/components/filter-toolbar/filter-toolbar.component';

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
  ],
  templateUrl: './institute-course-management.component.html',
  styleUrl: './institute-course-management.component.css'
})
export class InstituteCourseManagementComponent implements OnInit {

  protected loading = signal<boolean>(false);

  protected dataSource:MatTableDataSource<Course> = new MatTableDataSource<Course>([]);

  private readonly courseService = inject(CourseService);
  private readonly alertService = inject(AlertService);
  private readonly fb = inject(NonNullableFormBuilder);

  protected displayedColumns: string[] = [ 'id', 'title', 'category', 'durationInHours', 'price', 'status', 'actions'];

  protected pageIndex = signal<number>(0);
  protected pageSize = signal<number>(10);
  protected totalElements = signal<number>(0);
  protected sortDirection = signal<'asc' | 'desc'>('desc');

  private readonly sortDirection$ = toObservable(this.sortDirection);
  private readonly pageIndex$ = toObservable(this.pageIndex);
  private readonly pageSize$ = toObservable(this.pageSize);

  protected readonly filterForm = this.fb.group({
    title: [''],
    category: [undefined as CourseCategory | undefined],
    level: [undefined as CourseLevel | undefined],
    language: [undefined as CourseLanguage | undefined],
    mode: [undefined as CourseMode | undefined],
    status: [undefined as CourseStatus | undefined]
  });

  // Metadata Configuration for the Reusable Filter Toolbar
  protected readonly filterFields: FilterFieldConfig[] = [
    {
      key: 'title',
      label: 'Course Title',
      type: 'text',
      placeholder: 'Search by title...',
      colSpan: 'lg:col-span-2'
    },
    {
      key: 'category',
      label: 'Category',
      type: 'select',
      options: Object.values(CourseCategory).map(v => ({ label: v, value: v })),
      placeholder: 'All Categories'
    },
    {
      key: 'level',
      label: 'Level',
      type: 'select',
      options: Object.values(CourseLevel).map(v => ({ label: v, value: v })),
      placeholder: 'All Levels'
    },
    {
      key: 'language',
      label: 'Language',
      type: 'select',
      options: Object.values(CourseLanguage).map(v => ({ label: v, value: v })),
      placeholder: 'All Languages'
    },
    {
      key: 'mode',
      label: 'Mode',
      type: 'select',
      options: Object.values(CourseMode).map(v => ({ label: v, value: v })),
      placeholder: 'All Modes'
    },
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      options: Object.values(CourseStatus).map(v => ({ label: v, value: v })),
      placeholder: 'All Statuses'
    }
  ];


  ngOnInit(): void {
    this.setupCourseFetchPipeline();
  }

  private setupCourseFetchPipeline(): void {
    // 1. Title changes with debounce and startWith to ensure initial emission
    const titleChanges$ = this.filterForm.controls.title.valueChanges.pipe(
      startWith(this.filterForm.controls.title.value),
      debounceTime(400),
      distinctUntilChanged()
    );

    // Reset pagination to page 0 whenever any enum filter changes
    ['category', 'level', 'language', 'mode', 'status'].forEach(controlName => {
      this.filterForm.get(controlName)?.valueChanges.subscribe(() => {
        this.pageIndex.set(0);
      });
    });

    // 2. Unified stream using object-based combineLatest inside ngOnInit (safe from injection errors)
    combineLatest({
      title: titleChanges$,
      category: this.filterForm.controls.category.valueChanges.pipe(startWith(this.filterForm.controls.category.value)),
      level: this.filterForm.controls.level.valueChanges.pipe(startWith(this.filterForm.controls.level.value)),
      language: this.filterForm.controls.language.valueChanges.pipe(startWith(this.filterForm.controls.language.value)),
      mode: this.filterForm.controls.mode.valueChanges.pipe(startWith(this.filterForm.controls.mode.value)),
      status: this.filterForm.controls.status.valueChanges.pipe(startWith(this.filterForm.controls.status.value)),
      direction: this.sortDirection$,
      page: this.pageIndex$,
      size: this.pageSize$
    }).pipe(
      debounceTime(50), // Batch rapid multi-control updates
      switchMap(({ title, category, level, language, mode, status, direction, page, size }) => {
        this.loading.set(true);

        const filter: CourseFilter = {
          title: title || undefined,
          category: category || undefined,
          level: level || undefined,
          language: language || undefined,
          mode: mode || undefined,
          status: status || undefined
        };

        const pagination = new PaginationRequest(page, size, direction, ['created_date']);

        return this.courseService.getPaginatedCoursesForCurrentInstitute(pagination, filter);
      })
    ).subscribe({
      next: (res) => {
        if (res.data) {
          this.dataSource.data = res.data ?? [];
          this.totalElements.set(res.totalElements ?? 0);
        }
        this.loading.set(false);
      },
      error: (err) => {
        this.alertService.triggerErrorAlert(err.error?.message ?? "Something went wrong while fetching courses.");
        this.loading.set(false);
      }
    });
  }

  protected toggleSortDirection(): void {
    this.sortDirection.update(dir => (dir === 'desc' ? 'asc' : 'desc'));
    this.pageIndex.set(0);
  }

  protected onPageChange(event: PageEvent): void {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }

  protected readonly Eye = Eye;
  protected readonly Object = Object;
  protected readonly ArrowUpDown = ArrowUpDown;
}
