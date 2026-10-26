import {Component, inject, ViewChild} from '@angular/core';
import {ApplicationService} from '../../services/application/application.service';
import {ActivatedRoute} from '@angular/router';
import {ApplicationDetailsResponse} from '../../dtos/response/application-details-response';
import {PageTitleComponent} from '@shared/components/page-title/page-title.component';
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
import {DatePipe, NgClass, NgIf, TitleCasePipe} from '@angular/common';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {environment} from '@env/environment.development';
import {ApplicationStatus} from '../../enums/application-status';
import {SelectionModel} from '@angular/cdk/collections';
import {InstituteTeacherService} from '../../../institute/services/institute-teacher/institute-teacher.service';
import {ApplicationSelectionRequest} from '../../dtos/request/ApplicationSelectionRequest';
import {MatTooltip} from '@angular/material/tooltip';
import {ApplicationRejectionRequest} from '../../dtos/request/ApplicationRejectionRequest';
import {BadgeComponent, CardShellComponent} from '@shared/ui';
import {PhonePipePipe} from '@shared/utils/pipes/phone-pipe/phone-pipe.pipe';
import {NoContentComponent} from '@shared/components/no-content/no-content.component';
import {BasePaginatedFilterComponent} from '@shared/utils/base/BasePaginatedFilterComponent';
import {ApplicationFilterRequest} from '@features/applications/dtos/request/application-filter-request';
import {FormGroup, NonNullableFormBuilder} from '@angular/forms';
import {PaginationRequest} from '@shared/utils/requests/PaginationRequest';
import {Observable} from 'rxjs';
import {FilterFieldConfig} from '@shared/utils/config/filter-config';
import {FilterToolbarComponent} from '@shared/components/filter-toolbar/filter-toolbar.component';
import {ArrowUpDown, LucideAngularModule} from 'lucide-angular';

@Component({
  selector: 'app-view-application',
  imports: [
    PageTitleComponent,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    DatePipe,
    MatPaginator,
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent,
    NgClass,
    NgIf,
    MatTooltip,
    CardShellComponent,
    BadgeComponent,
    PhonePipePipe,
    NoContentComponent,
    MatNoDataRow,
    FilterToolbarComponent,
    LucideAngularModule,
    TitleCasePipe
  ],
  templateUrl: './view-application.component.html',
  styleUrl: './view-application.component.css'
})
export class ViewApplicationComponent extends BasePaginatedFilterComponent<ApplicationDetailsResponse, ApplicationFilterRequest> {

  private vacancyId!:number;

  // Table related variables
  protected columns: string[] = ['select','id', 'dp' ,'firstName','lastName', 'status' , 'appliedDate', 'actions'];
  protected sortByFields:string[] = ['applied_date'];

  //multi select related variables
  protected selection = new SelectionModel<ApplicationDetailsResponse>(true,[]);

  protected get hasSelection(): boolean {
    return this.selection.selected.length > 0;
  }

  protected toggleRow(row: ApplicationDetailsResponse): void {
    this.selection.toggle(row);
  }

  protected isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  protected toggleAll(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.dataSource.data.forEach(row => this.selection.select(row));
    }
  }

  protected resetSelection():void{
    this.selection.clear();
  }

  // Drawer related variables
  @ViewChild('drawer') drawer!: MatSidenav;
  protected selectedTeacher:ApplicationDetailsResponse | null = null;

  // dependency injection
  private readonly applicationService: ApplicationService = inject((ApplicationService))
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly instituteTeacherService = inject(InstituteTeacherService);
  private readonly fb = inject(NonNullableFormBuilder);
  protected readonly environment = environment;
  protected readonly ApplicationStatus = ApplicationStatus;

  filterForm:FormGroup = this.fb.group({
    status: [undefined as ApplicationStatus | undefined],
    teacherName: ['']
  })

  filterFields:FilterFieldConfig[] = [
    {key: 'status', label: 'Status', type: 'select', placeholder: 'Select status', colSpan: 'lg:col-span-2', options: Object.values(ApplicationStatus).map(v => ({label: v, value: v}))},
    {key: 'teacherName', label: 'Teacher Name', type: 'text', placeholder: 'Search by teacher name', colSpan: 'lg:col-span-3'}
  ]

  constructor(){
    super();
    this.activatedRoute.paramMap.subscribe(params => {
      const vacancyId = params.get('vacancyId');
      if(vacancyId) {
        this.vacancyId = Number.parseInt(vacancyId);
      }else{
        this.alertService.triggerErrorAlert("Vacancy ID not found in route!");
      }
    });
  }

  protected fetchApiData(pagination:PaginationRequest, filters:ApplicationFilterRequest):Observable<any>{
    if(!this.vacancyId) {
      this.alertService.triggerErrorAlert("Vacancy ID not found in route!");
      return new Observable<any>();
    }
    return this.applicationService.getAllApplicationsByVacancy(this.vacancyId,pagination, filters);
  }

  protected override mapFormToFilter(formValues: Record<string, any>): ApplicationFilterRequest {
    return {
      status: formValues['status'] || undefined,
      teacherName: formValues['teacherName'] || undefined
    };
  }

  onBulkSelect():void{
    const request:ApplicationSelectionRequest = new ApplicationSelectionRequest();
    request.applicationIds = this.selection.selected.map(a => a.id);
    this.sendSelectionRequest(request);
  }

  onSingleSelect(applicationId:number){
    if(applicationId){
      const request:ApplicationSelectionRequest = new ApplicationSelectionRequest();
      request.applicationIds.push(applicationId);
      this.sendSelectionRequest(request);
    }
  }

  sendSelectionRequest(request:ApplicationSelectionRequest):void{
    this.loading.set(true);
    this.instituteTeacherService.onboardTeachers(request).subscribe({
      next: (res)=>{
        if(res.data){
          this.alertService.triggerSuccessAlert(` ${res.data.successApplicationIds.length} applications successfully onboarded!`);

          for (let app of this.dataSource.data){
            if(res.data?.successApplicationIds.includes(app.id)){
              app.status = ApplicationStatus.SELECTED;
            }
          }

          if (res.data.failedApplicationIds.length > 0){
            this.alertService.triggerErrorAlert(` ${res.data.failedApplicationIds.length} applications got failed to onboarded!`);
          }

          this.resetSelection();
          this.loading.set(false);
        }
      },
      error: (err)=>{
        this.alertService.triggerErrorAlert(err.error.message);
        this.loading.set(false);
      }
    })
  }

  onBulkReject(){
    const request:ApplicationRejectionRequest = new ApplicationRejectionRequest();
    request.applicationIds = this.selection.selected.map(a => a.id);
    this.sendRejectionRequest(request);
  }

  onSingleReject(applicationId:number){
    const request:ApplicationRejectionRequest = new ApplicationRejectionRequest();
    request.applicationIds.push(applicationId);
    this.sendRejectionRequest(request);
  }

  sendRejectionRequest(request:ApplicationRejectionRequest){
    this.loading.set(true);
    this.instituteTeacherService.rejectApplications(request).subscribe({
      next: (res)=>{
        this.loading.set(false);
        if(res.data){
          if (res.data.successApplicationIds.length > res.data.failedApplicationIds.length){
            this.alertService.triggerSuccessAlert(`${res.data.successApplicationIds.length} out of ${request.applicationIds.length} applications successfully rejected!`);
            for (let app of this.dataSource.data){
              if(res.data?.successApplicationIds.includes(app.id)){
                app.status = ApplicationStatus.REJECTED;
              }
            }
          }else{
            this.alertService.triggerErrorAlert(`${res.data.failedApplicationIds.length} out of ${request.applicationIds.length} applications failed rejected!`)
          }
        }
      },
      error: (err)=>{
        this.loading.set(false);
        this.alertService.triggerErrorAlert(err.error.message);
      }
    })
  }

  override onPageChange(event: PageEvent):void{
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.resetSelection();
  }

  protected openDrawer(teacher:ApplicationDetailsResponse):void{
    this.selectedTeacher = teacher;
    this.resetSelection();
    this.drawer.open();
  }

  protected readonly ArrowUpDown = ArrowUpDown;
}
