import {Component, inject} from '@angular/core';
import {PageTitleComponent} from '../../../../../../../shared/components/page-title/page-title.component';
import {TeacherVacancyService} from '../../../../../../../core/services/teacher-vacancy/teacher-vacancy.service';
import {TeacherVacancy} from '../../../../../../../core/models/teacher-vacancy';
import {ApiResponse} from '../../../../../../../core/dto/response-dto/api-response';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {Edit, Eye, LucideAngularModule} from 'lucide-angular';
import {MatTooltip} from '@angular/material/tooltip';
import {DatePipe, NgClass} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {
  ViewTeacherVacancySingleDialogComponent
} from './model/view-teacher-vacancy-single-dialog/view-teacher-vacancy-single-dialog.component';
import {TeacherVacancyStatus} from '../../../../../../../core/enums/teacher-vacancy-status';
import {
  UpdateTeacherVacancyDialogComponent
} from './model/update-teacher-vacancy-dialog/update-teacher-vacancy-dialog.component';

@Component({
  selector: 'app-view-teacher-vacancy',
  imports: [
    PageTitleComponent,
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
    NgClass
  ],
  templateUrl: './view-teacher-vacancy.component.html',
  styleUrl: './view-teacher-vacancy.component.css'
})
export class ViewTeacherVacancyComponent {

  protected vacancies:TeacherVacancy[] = [];

  private readonly teacherVacancyService = inject(TeacherVacancyService);
  private readonly dialog = inject(MatDialog);

  //table related
  protected dataSource = new MatTableDataSource(this.vacancies);
  protected columns:string[] = ['title','status','requiredExperienceYears', 'closingDate', 'actions']

  constructor() {
    this.teacherVacancyService.getVacanciesByInstitute().subscribe({
      next: (res:ApiResponse<TeacherVacancy[]>)=>{
        this.vacancies= Array.isArray(res.data) ? res.data : [];
        this.dataSource.data = this.vacancies;
      },
      error: (err)=>{
        console.error(err)
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

  protected readonly Edit = Edit;
  protected readonly Eye = Eye;
  protected readonly TeacherVacancyStatus = TeacherVacancyStatus;
}
