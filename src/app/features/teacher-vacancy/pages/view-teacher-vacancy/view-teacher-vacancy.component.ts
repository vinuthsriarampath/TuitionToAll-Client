import {Component, inject, OnInit, ViewChild} from '@angular/core';
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
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {Edit, Eye, FileUser, LucideAngularModule} from 'lucide-angular';
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
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {PaginatedApiResponse} from '../../../../shared/utils/response/paginated-api-response';
import {RouterLink} from '@angular/router';
import {PageLayoutComponent} from '../../../../core/layouts/page-layout/page-layout.component';

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
    PageLayoutComponent
  ],
  templateUrl: './view-teacher-vacancy.component.html',
  styleUrl: './view-teacher-vacancy.component.css'
})
export class ViewTeacherVacancyComponent implements OnInit{

  protected loading:boolean= false;

  protected vacancies:TeacherVacancy[] = [];

  private readonly teacherVacancyService = inject(TeacherVacancyService);
  private readonly dialog = inject(MatDialog);
  protected readonly TeacherVacancyStatus = TeacherVacancyStatus;


  //table related
  protected dataSource = new MatTableDataSource(this.vacancies);
  protected columns:string[] = ['title','status','requiredExperienceYears', 'closingDate', 'actions']

  protected totalElements:number=0;
  protected pageSize:number = 10;
  protected pageIndex:number = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngOnInit() {
    this.loadVacancies();
  }

  protected onPageChange(event: PageEvent):void{
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadVacancies();
  }
  private loadVacancies(){
    this.triggerLoading();
    this.teacherVacancyService.getVacanciesByInstitute( this.pageIndex, this.pageSize).subscribe({
      next: (res:PaginatedApiResponse<TeacherVacancy>)=>{
        this.vacancies= Array.isArray(res.data) ? res.data : [];
        this.dataSource.data = this.vacancies;
        this.totalElements = res.totalElements ?? 0;
        this.pageIndex = res.page ?? 0;
        this.pageSize = res.size ?? 10;

        this.triggerLoading();
      },
      error: (err)=>{
        console.error(err)
        this.triggerLoading();
      }
    })
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
        this.openVacancyUpdateDialog(vacancy);
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
        this.vacancies.forEach((v,i)=>{
          if(v.id === res.data.id){
            this.vacancies[i] = res.data;
            this.dataSource.data = this.vacancies;
          }
        });
      }
    });
  }

  private triggerLoading():void{
    this.loading = !this.loading;
  }

  protected readonly Edit = Edit;
  protected readonly Eye = Eye;
  protected readonly FileUser = FileUser;
}
