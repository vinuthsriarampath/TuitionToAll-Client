import {DestroyRef, Directive, inject, OnInit, signal} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {AlertService} from '@core/services/alerts/alert.service';
import {takeUntilDestroyed, toObservable} from '@angular/core/rxjs-interop';
import {FormGroup} from '@angular/forms';
import {PaginationRequest} from '@shared/utils/requests/PaginationRequest';
import {combineLatest, debounceTime, distinctUntilChanged, Observable, of, startWith, Subject, switchMap} from 'rxjs';
import {PageEvent} from '@angular/material/paginator';
import {catchError} from 'rxjs/operators';

@Directive()
export abstract class BasePaginatedFilterComponent<TItem,TFilter> implements OnInit{
  protected readonly alertService = inject(AlertService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly loading = signal<boolean>(false);
  protected readonly dataSource = new MatTableDataSource<TItem>([]);

  protected readonly pageIndex = signal<number>(0);
  protected readonly pageSize = signal<number>(10);
  protected readonly totalElements = signal<number>(0);
  protected readonly sortDirection = signal<'asc' | 'desc'>('desc');

  private readonly refresh$ = new Subject<void>();

  // Observables converted from signals
  private readonly sortDirection$ = toObservable(this.sortDirection);
  private readonly pageIndex$ = toObservable(this.pageIndex);
  private readonly pageSize$ = toObservable(this.pageSize);

  // Abstract members that individual components must define
  protected abstract filterForm: FormGroup;
  protected abstract sortByFields: string[];

  // Abstract method implemented by components to execute their respective service call.
  protected abstract fetchApiData(pagination: PaginationRequest, filter: TFilter): Observable<{ data?: TItem[]; totalElements?: number }>;

  // Maps raw form values into the specific Filter Request DTO.
  protected abstract mapFormToFilter(formValues: Record<string, any>): TFilter;

  ngOnInit(): void {
    this.initFilterPipeline();
  }

  private initFilterPipeline(): void {
    const controls = this.filterForm.controls; // extracting controls from the form group
    const controlKeys = Object.keys(controls); // get the keys of the controls

    // Build dynamic observable map for form controls, applying debounce to text controls if needed
    const formObservables: Record<string, Observable<any>> = {};

    controlKeys.forEach(key => {
      const control = controls[key];
      if (key === 'title' || key.toLowerCase().includes('search') || key.toLowerCase().includes('name')) {
        formObservables[key] = control.valueChanges.pipe(
          startWith(control.value),
          debounceTime(400),
          distinctUntilChanged()
        );
      } else {
        // Dropdowns, enums, IDs trigger immediately with reset-to-page-0 behavior
        formObservables[key] = control.valueChanges.pipe(
          startWith(control.value),
          distinctUntilChanged()
        );
        control.valueChanges.pipe(
          takeUntilDestroyed(this.destroyRef)
        ).subscribe(() => this.pageIndex.set(0));
      }
    });

    combineLatest({
      formValues: combineLatest(formObservables),
      direction: this.sortDirection$,
      page: this.pageIndex$,
      size: this.pageSize$,
      refresh: this.refresh$.pipe(startWith(undefined))
    }).pipe(
      debounceTime(50),
      switchMap(({ formValues, direction, page, size }) => {
        this.loading.set(true);
        const filter = this.mapFormToFilter(formValues);
        const pagination = new PaginationRequest(page, size, direction, this.sortByFields);

        return this.fetchApiData(pagination, filter).pipe(
          catchError((err) => {
            this.alertService.triggerErrorAlert(err.error?.message ?? 'Something went wrong while fetching data.');
            return of({data: [], totalElements: 0});
          })
        );
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (res) => {
        this.dataSource.data = res.data ?? [];
        this.totalElements.set(res.totalElements ?? 0);
        this.loading.set(false);
      }
    });
  }

  protected toggleSortDirection(): void {
    this.sortDirection.update(dir => (dir === 'desc' ? 'asc' : 'desc'));
    this.pageIndex.set(0);
  }

  protected clearFilters():void {
    this.filterForm.reset();
    this.pageIndex.set(0);
  }

  protected onPageChange(event: PageEvent): void {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }

  protected refresh(): void {
    this.refresh$.next();
  }
}
