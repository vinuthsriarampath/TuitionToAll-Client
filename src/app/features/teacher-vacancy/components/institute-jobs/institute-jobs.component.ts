import {Component, inject, input, OnInit, signal} from '@angular/core';
import {InstituteService} from '../../../institute/services/institute/institute.service';
import {TeacherVacancyStatus} from '../../enums/teacher-vacancy-status';
import {TeacherVacancy} from '../../dtos/response/teacher-vacancy';
import {FormsModule} from '@angular/forms';
import {VacancyCardComponent} from '@features/teacher-vacancy/components/vacancy-card/vacancy-card.component';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {NoContentComponent} from '@shared/components/no-content/no-content.component';
import {combineLatest, distinctUntilChanged, switchMap} from 'rxjs';
import {toObservable} from '@angular/core/rxjs-interop';
import {AlertService} from '@core/services/alerts/alert.service';

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
  instituteId = input.required<number>();

  protected teacherVacancies = signal<TeacherVacancy[]>([]);
  protected loading = signal<boolean>(false);


  protected readonly instituteService = inject(InstituteService);
  protected readonly alertService = inject(AlertService);

  private readonly instituteId$ = toObservable(this.instituteId);

  ngOnInit() {
    combineLatest([this.instituteId$])
      .pipe(
        distinctUntilChanged(([prevId], [currId]) => prevId === currId),
        switchMap(([instituteId]) => {
          this.loading.set(true);
          return this.instituteService.getVacanciesByStatusAndInstituteId(instituteId, TeacherVacancyStatus.OPEN);
        })
      )
      .subscribe({
        next: (res)=>{
          if(res.data){
            this.teacherVacancies.set(res.data);
            this.loading.set(false);
          }
        },
        error: (err)=>{
          this.alertService.triggerErrorAlert(err.error.message ?? 'Something went wrong while fetching vacancies.');
          this.loading.set(false);
        }
      });
  }
}
