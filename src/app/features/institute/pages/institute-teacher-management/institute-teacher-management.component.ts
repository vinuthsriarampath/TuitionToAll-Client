import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {DatePipe, NgClass, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {PageTitleComponent} from '../../../../shared/components/page-title/page-title.component';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatDialog} from '@angular/material/dialog';
import {CreateVacancyDialogComponent} from '../../../teacher-vacancy/dialogs/create-vacancy-dialog/create-vacancy-dialog.component';
import {RouterLink} from '@angular/router';
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
import {MatTooltip} from '@angular/material/tooltip';
import {InstituteTeacherService} from '../../services/institute-teacher/institute-teacher.service';
import {InstituteTeacherResponse} from '../../dtos/response/InstituteTeacherResponse';
import {AlertService} from '../../../../core/services/alerts/alert.service';
import {environment} from '../../../../../environment/environment.development';
import {ApplicationStatus} from '../../../applications/enums/application-status';
import {InstituteTeacherStatus} from '../../enums/InstituteTeacherStatus';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {InstituteTeacherStatsResponse} from '../../dtos/response/InstituteTeacherStatsResponse';

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
    MatPaginator
  ],
  templateUrl: './institute-teacher-management.component.html',
  styleUrl: './institute-teacher-management.component.css'
})
export class InstituteTeacherManagementComponent implements OnInit{

  @ViewChild('drawer') drawer!: MatSidenav;

  private readonly dialog = inject(MatDialog);
  private readonly instituteTeacherService:InstituteTeacherService = inject(InstituteTeacherService)
  private readonly alertService:AlertService = inject(AlertService);

  selectedTeacher!: InstituteTeacherResponse;

  stats:InstituteTeacherStatsResponse = {
    totalTeachers: 0,
    activeTeachers: 0,
    suspendedTeachers: 0,
    inactiveTeachers: 0
  };

  //table related variables
  protected dataSource = new MatTableDataSource<InstituteTeacherResponse>();
  columns:string[] = ['id','firstName','lastName','email','contact','status','joinedDate','actions'];


  // pagination related

  protected pageIndex:number = 0;
  protected pageSize:number = 10;
  protected totalElements:number = 0;

  protected onPageChange(event:PageEvent){
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadTeachersByInstitute();
  }

  // initialize data

  ngOnInit(): void {
    this.loadInstituteTeacherStats();
    this.loadTeachersByInstitute();
  }

  /***
   Load all teachers related to the current institute
  ***/
  private loadTeachersByInstitute():void{
    this.instituteTeacherService.getAllTeachersByInstitute(this.pageIndex,this.pageSize).subscribe({
      next: (res) => {
        if(res){
          this.dataSource.data = res.data ?? [];
          this.pageIndex = res.page ?? 0;
          this.pageSize = res.size ?? 10;
          this.totalElements = res.totalElements ?? 0;
        }
      },
      error: (err) => {
        this.alertService.triggerErrorAlert(err.error.message);
      }
    })
  }

  /***
   fetch stats related to the current institute
   ***/
  private loadInstituteTeacherStats():void{
    this.instituteTeacherService.getInstituteTeacherStats().subscribe({
      next: (res)=> {
        if(res.data){
          this.stats.totalTeachers = res.data.totalTeachers ?? 0;
          this.stats.activeTeachers = res.data.activeTeachers ?? 0;
          this.stats.suspendedTeachers = res.data.suspendedTeachers ?? 0;
          this.stats.inactiveTeachers = res.data.inactiveTeachers ?? 0;
        }
      },
      error: (err) => {
        this.alertService.triggerErrorAlert(err.error.message);
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
      console.log('The dialog was closed');
      this.selectedTeacher = result;
    });
  }

  protected readonly environment = environment;
  protected readonly ApplicationStatus = ApplicationStatus;
  protected readonly InstituteTeacherResponse = InstituteTeacherResponse;
  protected readonly InstituteTeacherStatus = InstituteTeacherStatus;
}
