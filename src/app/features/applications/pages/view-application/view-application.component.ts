import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {ApplicationService} from '../../services/application/application.service';
import {ActivatedRoute} from '@angular/router';
import {
  ApplicationDetailsResponse
} from '../../dtos/response/application-details-response';
import {AlertService} from '../../../../core/services/alerts/alert.service';
import {PageTitleComponent} from '../../../../shared/components/page-title/page-title.component';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {DatePipe, NgClass, NgIf} from '@angular/common';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {environment} from '../../../../environment/environment.development';
import {ApplicationStatus} from '../../enums/application-status';
import {SelectionModel} from '@angular/cdk/collections';
import {
  InstituteTeacherService
} from '../../../../core/services/institute-teacher/institute-teacher.service';
import {ApplicationSelectionRequest} from '../../dtos/request/ApplicationSelectionRequest';
import {MatTooltip} from '@angular/material/tooltip';
import {ApplicationRejectionRequest} from '../../dtos/request/ApplicationRejectionRequest';

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
    MatTooltip
  ],
  templateUrl: './view-application.component.html',
  styleUrl: './view-application.component.css'
})
export class ViewApplicationComponent implements OnInit {

  private vacancyId!:number;
  private applications:ApplicationDetailsResponse[] = [];

  // Table related variables
  protected dataSource = new MatTableDataSource(this.applications);
  protected columns: string[] = ['select','id', 'dp' ,'firstName','lastName', 'status' , 'appliedDate', 'actions'];
  protected pageIndex:number = 0;
  protected pageSize:number = 10;
  protected totalElements:number = 0;

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
  private readonly alertService = inject(AlertService);
  private readonly instituteTeacherService = inject(InstituteTeacherService);

  protected readonly environment = environment;
  protected readonly ApplicationStatus = ApplicationStatus;

  ngOnInit(): void {
    this.loadVacancyIdFromRoute()
  }

  private loadVacancyIdFromRoute():void{
    this.activatedRoute.paramMap.subscribe(params => {
      const vacancyId = params.get('vacancyId');
      if(vacancyId) {
        this.vacancyId = Number.parseInt(vacancyId);
        this.loadApplications();
      }else{
        this.alertService.triggerErrorAlert("Vacancy ID not found in route!");
      }
    });
  }

  private loadApplications():void{
    this.applicationService.getAllApplicationsByVacancy(this.vacancyId,this.pageIndex,this.pageSize).subscribe({
      next: (res)=>{
        if (res.data) {
          this.applications = res.data;
          this.dataSource.data = this.applications;
          this.pageIndex = res.page ?? 0;
          this.pageSize = res.size ?? 10;
          this.totalElements = res.totalElements ?? 0;
        }
      },
      error: (err)=>{
        console.log(err);
      }
    })
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
        }
      },
      error: (err)=>{
        console.log(err.error.message)
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
    this.instituteTeacherService.rejectApplications(request).subscribe({
      next: (res)=>{
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
        this.alertService.triggerErrorAlert(err.error.message);
      }
    })
  }

  protected onPageChange(event: PageEvent):void{
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadApplications();
    this.resetSelection();
  }

  protected openDrawer(teacher:ApplicationDetailsResponse):void{
    this.selectedTeacher = teacher;
    this.resetSelection();
    this.drawer.open();
  }



}
