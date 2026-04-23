import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TeacherVacancy} from '../../../../core/models/teacher-vacancy';
import {DatePipe} from '@angular/common';
import {TeacherVacancyService} from '../../../../core/services/teacher-vacancy/teacher-vacancy.service';
import {QuillEditorComponent} from 'ngx-quill';
import {FormsModule} from '@angular/forms';
import {PageTitleComponent} from '../../../../shared/components/page-title/page-title.component';
import {UserService} from '../../../../core/services/user/user.service';
import {User} from '../../../../core/models/user-models/user';
import {ApplicationService} from '../../../../core/services/application/application.service';
import {AlertService} from '../../../../core/services/alerts/alert.service';

@Component({
  selector: 'app-job-application',
  imports: [
    DatePipe,
    QuillEditorComponent,
    FormsModule,
    PageTitleComponent
  ],
  templateUrl: './job-application.component.html',
  styleUrl: './job-application.component.css'
})
export class JobApplicationComponent implements OnInit{

  protected isApplied:boolean = false;
  protected vacancyId!: number;
  protected vacancy!:TeacherVacancy;
  protected currentUser!: User;

  private readonly activateRoute:ActivatedRoute = inject(ActivatedRoute);
  private readonly teacherVacancyService:TeacherVacancyService = inject(TeacherVacancyService);
  private readonly userService:UserService = inject(UserService);
  private readonly applicationService:ApplicationService = inject(ApplicationService);
  private readonly alertService:AlertService = inject(AlertService);

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe(params=>{
      this.vacancyId = Number(params.get('vacancyId'));
      this.loadVacancyData();
    });
    this.getCurrentUser();
  }

  private loadVacancyData():void{
    this.teacherVacancyService.getById(this.vacancyId).subscribe({
      next: (res)=>{
        if(res.data){
          this.vacancy = res.data;
          this.checkIfApplied();
        }
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

  private getCurrentUser():void{
    this.userService.currentUser$.subscribe(user => {
      // TODO fix when page reloads current user becomes null
      if(user) this.currentUser = structuredClone(user);
    })
  }

  private checkIfApplied():void{
    if(this.currentUser.details?.id != null  && this.vacancy){
      this.applicationService.checkIfUserAlreadyApplied(this.currentUser.details.id, this.vacancy.id).subscribe({
        next: (res)=>{
          if (res.data){
            this.isApplied = res.data;
          }
        },
        error: (err)=>{
          console.log(err);
        }
      })

    }
  }

  protected applyForVacancy() {
    if (this.isApplied) return;
    const message =  "Apply for This Vacancy?";
    const description = "Once you apply, your application will be recorded and sent to the institute for review. You won’t be able to submit another application for this vacancy.";
    this.alertService.triggerSuccessConfirmationAlert(message,description).subscribe({
      next: (res)=>{
        if(res){
          if (this.vacancy && this.currentUser.details) {
            this.applicationService.createApplication(this.vacancy.id).subscribe({
              next: (res)=>{
                if(res){
                  this.checkIfApplied();
                }
              },
              error: (err)=>{
                this.checkIfApplied();
              }
            })
          }
        }
      }
    });

  }
}
