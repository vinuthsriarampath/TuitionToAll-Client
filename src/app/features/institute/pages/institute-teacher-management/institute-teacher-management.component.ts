import {Component, inject, ViewChild} from '@angular/core';
import {DatePipe, NgClass, NgIf} from '@angular/common';
import {FormGroup, FormsModule, NonNullableFormBuilder} from '@angular/forms';
import {PageTitleComponent} from '@shared/components/page-title/page-title.component';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatDialog} from '@angular/material/dialog';
import {
  CreateVacancyDialogComponent
} from '../../../teacher-vacancy/dialogs/create-vacancy-dialog/create-vacancy-dialog.component';
import {RouterLink} from '@angular/router';
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
import {MatTooltip} from '@angular/material/tooltip';
import {InstituteTeacherService} from '../../services/institute-teacher/institute-teacher.service';
import {InstituteTeacherResponse} from '../../dtos/response/institute-teacher-responses/InstituteTeacherResponse';
import {environment} from '@env/environment.development';
import {InstituteTeacherStatus} from '../../enums/InstituteTeacherStatus';
import {MatPaginator} from '@angular/material/paginator';
import {
  InstituteTeacherStatsResponse
} from '../../dtos/response/institute-teacher-responses/InstituteTeacherStatsResponse';
import {BadgeComponent, CardShellComponent, StatCardComponent} from '@shared/ui';
import {NoContentComponent} from '@shared/components/no-content/no-content.component';
import {InstituteTeacherFilterRequest} from '@features/institute/dtos/requests/institute-teacher-filter-request';
import {BasePaginatedFilterComponent} from '@shared/utils/base/BasePaginatedFilterComponent';
import {PaginationRequest} from '@shared/utils/requests/PaginationRequest';
import {Observable} from 'rxjs';
import {FilterFieldConfig} from '@shared/utils/config/filter-config';
import {FilterToolbarComponent} from '@shared/components/filter-toolbar/filter-toolbar.component';
import {ArrowUpDown, LucideAngularModule} from 'lucide-angular';

@Component({
  selector: 'app-institute-teacher-management',
  imports: [
    FormsModule,
    PageTitleComponent,
    NgIf,
    MatSidenavContent,
    MatSidenav,
    MatSidenavContainer,
    RouterLink,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatTooltip,
    DatePipe,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRowDef,
    MatRow,
    NgClass,
    MatPaginator,
    CardShellComponent,
    BadgeComponent,
    NoContentComponent,
    StatCardComponent,
    MatNoDataRow,
    FilterToolbarComponent,
    LucideAngularModule
  ],
  templateUrl: './institute-teacher-management.component.html',
  styleUrl: './institute-teacher-management.component.css'
})
export class InstituteTeacherManagementComponent extends BasePaginatedFilterComponent<InstituteTeacherResponse, InstituteTeacherFilterRequest>{

  @ViewChild('drawer') drawer!: MatSidenav;

  protected statLoading:boolean = false;

  private readonly dialog = inject(MatDialog);
  private readonly instituteTeacherService:InstituteTeacherService = inject(InstituteTeacherService);
  private readonly fb = inject(NonNullableFormBuilder);

  constructor(){
    super();
    this.loadInstituteTeacherStats();
  }

  filterForm:FormGroup = this.fb.group({
    search: [''],
    status: [undefined as InstituteTeacherStatus | undefined]
  });

  filterFields:FilterFieldConfig[] = [
    {key: 'search', label:'Search', type: 'text', placeholder: 'Search by name, email or userSlug', colSpan: 'lg:col-span-3'},
    {key: 'status', label:'Status', type: 'select', placeholder: 'Select status', options: Object.values(InstituteTeacherStatus).map(v =>({label: v, value: v}))}
  ]

  selectedTeacher!: InstituteTeacherResponse;

  stats:InstituteTeacherStatsResponse = {
    totalTeachers: 0,
    activeTeachers: 0,
    suspendedTeachers: 0,
    inactiveTeachers: 0
  };

  //table related variables
  columns:string[] = ['id','firstName','lastName','email','contact','status','joinedDate','actions'];
  sortByFields:string[] = ["joined_date"];


  fetchApiData(pagination:PaginationRequest, filters:InstituteTeacherFilterRequest):Observable<any>{
    return this.instituteTeacherService.getAllTeachersByInstitute(pagination,filters);
  }


  private loadInstituteTeacherStats():void{
    this.triggerStatLoading();
    this.instituteTeacherService.getInstituteTeacherStats().subscribe({
      next: (res)=> {
        if(res.data){
          this.stats.totalTeachers = res.data.totalTeachers ?? 0;
          this.stats.activeTeachers = res.data.activeTeachers ?? 0;
          this.stats.suspendedTeachers = res.data.suspendedTeachers ?? 0;
          this.stats.inactiveTeachers = res.data.inactiveTeachers ?? 0;
          this.triggerStatLoading();
        }
      },
      error: (err) => {
        this.alertService.triggerErrorAlert(err.error.message);
        this.triggerStatLoading();
      }
    })
  }

  // Drawer Related methods

  openProfileDrawer(teacher: InstituteTeacherResponse) {
    this.selectedTeacher = teacher;
    this.drawer.open();
  }

  // Create Vacancy Dialog

  openCreateVacancy() {
    const dialogRef = this.dialog.open(CreateVacancyDialogComponent,{
      maxWidth: '100vh',
      width: '500%',
      panelClass: 'create-vacancy-dialog',
    })

    dialogRef.afterOpened().subscribe(() => {
      document.querySelector('input')?.focus();
    });

    dialogRef.afterClosed().subscribe(result => {
      this.selectedTeacher = result;
    });
  }

  private triggerStatLoading():void{
    this.statLoading = !this.statLoading;
  }

  protected override mapFormToFilter(formValues: Record<string, any>): InstituteTeacherFilterRequest {
    return {
      name: formValues['search'] || undefined,
      email: formValues['search'] || undefined,
      userSlug: formValues['search'] || undefined,
      status: formValues['status'] || undefined
    };
  }

  protected readonly environment = environment;
  protected readonly InstituteTeacherStatus = InstituteTeacherStatus;
  protected readonly ArrowUpDown = ArrowUpDown;
}
