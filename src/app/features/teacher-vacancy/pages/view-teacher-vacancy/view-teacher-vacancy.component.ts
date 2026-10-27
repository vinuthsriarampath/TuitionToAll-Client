import {Component, inject} from '@angular/core';
import {TeacherVacancyService} from '../../services/teacher-vacancy/teacher-vacancy.service';
import {TeacherVacancy} from '../../dtos/response/teacher-vacancy';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table';
import {ArrowUpDown, Edit, Eye, FileUser, LucideAngularModule} from 'lucide-angular';
import {MatTooltip} from '@angular/material/tooltip';
import {DatePipe, NgClass} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {
  ViewTeacherVacancySingleDialogComponent
} from '../../dialogs/view-teacher-vacancy-single-dialog/view-teacher-vacancy-single-dialog.component';
import {TeacherVacancyStatus} from '../../enums/teacher-vacancy-status';
import {
  UpdateTeacherVacancyDialogComponent
} from '../../dialogs/update-teacher-vacancy-dialog/update-teacher-vacancy-dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {RouterLink} from '@angular/router';
import {PageLayoutComponent} from '@core/layouts/page-layout/page-layout.component';
import {NoContentComponent} from '@shared/components/no-content/no-content.component';
import {BasePaginatedFilterComponent} from '@shared/utils/base/BasePaginatedFilterComponent';
import {TeacherVacancyFilterRequest} from '@features/teacher-vacancy/dtos/request/teacher-vacancy-filter-request';
import {PaginationRequest} from '@shared/utils/requests/PaginationRequest';
import {Observable} from 'rxjs';
import {FormGroup, NonNullableFormBuilder} from '@angular/forms';
import {FilterFieldConfig} from '@shared/utils/config/filter-config';
import {FilterToolbarComponent} from '@shared/components/filter-toolbar/filter-toolbar.component';

@Component({
  selector: 'app-view-teacher-vacancy',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatHeaderCellDef,
    MatCellDef,
    LucideAngularModule,
    MatTooltip,
    DatePipe,
    NgClass,
    MatPaginator,
    RouterLink,
    PageLayoutComponent,
    MatNoDataRow,
    NoContentComponent,
    FilterToolbarComponent,
  ],
  templateUrl: './view-teacher-vacancy.component.html',
  styleUrl: './view-teacher-vacancy.component.css'
})
export class ViewTeacherVacancyComponent extends BasePaginatedFilterComponent<TeacherVacancy, TeacherVacancyFilterRequest>{


  private readonly teacherVacancyService = inject(TeacherVacancyService);
  private readonly dialog = inject(MatDialog);
  private readonly fb = inject(NonNullableFormBuilder);

  protected filterForm:FormGroup = this.fb.group({
    title: [''],
    status: [undefined as TeacherVacancyStatus | undefined]
  });

  filterFields:FilterFieldConfig[] = [
    {key:'title', label:'Title', type:'text', placeholder:'Search by title', colSpan:'lg:col-span-3'},
    {key: 'status', label: 'Status', type: 'select', placeholder: 'Select status', colSpan: 'lg:col-span-2', options: Object.values(TeacherVacancyStatus).map(v => ({label: v, value: v}))}
  ]
  protected readonly TeacherVacancyStatus = TeacherVacancyStatus;


  //table related
  protected columns:string[] = ['title','status','requiredExperienceYears', 'closingDate', 'actions']
  protected sortByFields:string[] = ['created_date'];

  protected fetchApiData(pagination:PaginationRequest, filters:TeacherVacancyFilterRequest):Observable<any>{
    return this.teacherVacancyService.getVacanciesByInstitute(pagination, filters)
  }

  openSingleVacancyView(vacancy:TeacherVacancy):void{
    const dialogRef = this.dialog.open(ViewTeacherVacancySingleDialogComponent,{
      maxWidth: '100vh',
      width: '500%',
      panelClass: 'view-single-vacancy-dialog',
      data:vacancy
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.clearFilters();
      }
    });

  }

  protected openVacancyUpdateDialog(vacancy:TeacherVacancy):void{
    const dialogRef =  this.dialog.open(UpdateTeacherVacancyDialogComponent,{
      maxWidth: '100vh',
      width: '500%',
      panelClass: 'update-vacancy-dialog',
      data: vacancy
    });

    dialogRef.afterOpened().subscribe(() => {
      document.querySelector('input')?.focus();
    });

    dialogRef.afterClosed().subscribe((res:{message:string,data:TeacherVacancy}) => {
      if(res){
        this.clearFilters();
      }
    });
  }

  protected override mapFormToFilter(formValues: Record<string, any>): TeacherVacancyFilterRequest {
    return {
      title: formValues['title'] || undefined,
      status: formValues['status'] || undefined
    };
  }

  protected readonly Edit = Edit;
  protected readonly Eye = Eye;
  protected readonly FileUser = FileUser;
  protected readonly ArrowUpDown = ArrowUpDown;
}
