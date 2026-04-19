import {Component, inject, input, OnInit} from '@angular/core';
import {InstituteService} from '../../../core/services/institute/institute.service';
import {TeacherVacancyStatus} from '../../../core/enums/teacher-vacancy-status';
import {TeacherVacancy} from '../../../core/models/teacher-vacancy';
import {DatePipe, SlicePipe} from '@angular/common';
import {QuillEditorComponent} from 'ngx-quill';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-institute-jobs',
  imports: [
    DatePipe,
    SlicePipe,
    QuillEditorComponent,
    FormsModule
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

  protected readonly toolbar = toolbar;
}
