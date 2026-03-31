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
import {DatePipe} from '@angular/common';

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
    DatePipe
  ],
  templateUrl: './view-teacher-vacancy.component.html',
  styleUrl: './view-teacher-vacancy.component.css'
})
export class ViewTeacherVacancyComponent {

  protected vacancies:TeacherVacancy[] = [];

  private readonly teacherVacancyService = inject(TeacherVacancyService);

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

  protected readonly Edit = Edit;
  protected readonly Eye = Eye;
}
