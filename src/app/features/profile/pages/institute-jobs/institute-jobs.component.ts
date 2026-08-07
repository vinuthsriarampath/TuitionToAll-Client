import {Component, inject, input, OnInit} from '@angular/core';
import {InstituteService} from '../../../institute/services/institute/institute.service';
import {TeacherVacancyStatus} from '../../../teacher-vacancy/enums/teacher-vacancy-status';
import {TeacherVacancy} from '../../../teacher-vacancy/dtos/response/teacher-vacancy';
import {FormsModule} from '@angular/forms';
import {VacancyCardComponent} from '../../components/vacancy-card/vacancy-card.component';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {NoContentComponent} from '@shared/components/no-content/no-content.component';

@Component({
  selector: 'app-institute-jobs',
  imports: [
    FormsModule,
    VacancyCardComponent,
    MatProgressSpinner,
    NoContentComponent
  ],
  templateUrl: './institute-jobs.component.html',
  styleUrl: './institute-jobs.component.css'
})
export class InstituteJobsComponent implements OnInit{

  protected teacherVacancies!: TeacherVacancy[];
  protected loading:boolean = false;

  instituteId = input.required<number>();

  protected readonly instituteService = inject(InstituteService);

  ngOnInit() {
    this.fetchVacancies();
  }

  fetchVacancies(){
    this.triggerLoading();
    this.instituteService.getVacanciesByStatusAndInstituteId(this.instituteId(),TeacherVacancyStatus.OPEN).subscribe({
      next: (res)=>{
        if(res.data){
          this.teacherVacancies = res.data;
          this.triggerLoading();
        }
      },
      error: (err)=>{
        console.log(err);
        this.triggerLoading();
      }
    })
  }

  triggerLoading(){
    this.loading = !this.loading;
  }
}
