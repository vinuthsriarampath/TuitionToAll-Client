import {Component, inject, OnInit, ViewChild, viewChild} from '@angular/core';
import {ApplicationService} from '../../../../../../../../../core/services/application/application.service';
import {ActivatedRoute} from '@angular/router';
import {
  ApplicationDetailsResponse
} from '../../../../../../../../../core/dto/response-dto/application-details-response';
import {AlertService} from '../../../../../../../../../core/services/alerts/alert.service';
import {PageTitleComponent} from '../../../../../../../../../shared/components/page-title/page-title.component';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {DatePipe, NgClass, NgIf} from '@angular/common';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {environment} from '../../../../../../../../../environment/environment.development';
import {ApplicationStatus} from '../../../../../../../../../core/enums/application-status';

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
    NgIf
  ],
  templateUrl: './view-application.component.html',
  styleUrl: './view-application.component.css'
})
export class ViewApplicationComponent implements OnInit {

  private vacancyId!:number;
  private applications:ApplicationDetailsResponse[] = [];

  // Table related variables
  protected dataSource = new MatTableDataSource(this.applications);
  protected columns: string[] = ['id', 'dp' , 'status' , 'appliedDate', 'actions'];
  protected pageIndex:number = 0;
  protected pageSize:number = 10;
  protected totalElements:number = 0;

  // Drawer related variables
  @ViewChild('drawer') drawer!: MatSidenav;
  protected selectedTeacher:ApplicationDetailsResponse | null = null;

  // dependency injection
  private readonly applicationService: ApplicationService = inject((ApplicationService))
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly alertService = inject(AlertService);

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

  protected onPageChange(event: PageEvent):void{
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadApplications();
  }

  protected openDrawer(teacher:ApplicationDetailsResponse):void{
    this.selectedTeacher = teacher;
    this.drawer.open();
  }



}
