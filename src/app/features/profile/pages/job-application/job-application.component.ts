import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TeacherVacancy} from '../../../teacher-vacancy/dtos/response/teacher-vacancy';
import {DatePipe} from '@angular/common';
import {TeacherVacancyService} from '../../../teacher-vacancy/services/teacher-vacancy/teacher-vacancy.service';
import {QuillEditorComponent} from 'ngx-quill';
import {FormsModule} from '@angular/forms';
import {UserService} from '../../services/user/user.service';
import {User} from '../../dtos/response/user';
import {ApplicationService} from '../../../applications/services/application/application.service';
import {AlertService} from '@core/services/alerts/alert.service';
import {TeacherVacancyStatus} from '../../../teacher-vacancy/enums/teacher-vacancy-status';
import {ConfirmationDialogData} from '@shared/dialogs/confirmation-dialog/confirmation-dialog.component';
import {Check} from 'lucide-angular';
import {PageLayoutComponent} from '@core/layouts';
import {CardShellComponent} from '@shared/ui';

@Component({
  selector: 'app-job-application',
  imports: [
    DatePipe,
    QuillEditorComponent,
    FormsModule,
    PageLayoutComponent,
    CardShellComponent
  ],
  templateUrl: './job-application.component.html',
  styleUrl: './job-application.component.css'
})
export class JobApplicationComponent implements OnInit{

  protected isApplied:boolean = false;
  protected vacancyId!: number;
  protected vacancy!:TeacherVacancy;
  protected currentUser!: User;
  protected loading:boolean = false;

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
    this.triggerLoading();
    this.teacherVacancyService.getByIdAndStatus(this.vacancyId,TeacherVacancyStatus.OPEN).subscribe({
      next: (res)=>{
        if(res.data){
          this.vacancy = res.data;
          this.checkIfApplied();
          this.triggerLoading();
        }
      },
      error: (err)=>{
        if (err.status == 404){
          this.alertService.triggerErrorAlert("This vacancy is not available for application.")
        }else{
          this.alertService.triggerErrorAlert("Something Went Wrong!");
        }
        this.triggerLoading();
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
          this.alertService.triggerErrorAlert(err.error.message)
        }
      })

    }
  }

  protected applyForVacancy() {
    if (this.isApplied) return;

    const title = "Application Submitted Successfully !";
    const informationDescription = "<div class=\"text-sm font-medium tracking-wide text-sky-200/90 mt-1 leading-relaxed break-words\"><p>Your application has been successfully submitted to the institute.</p><p>The institute may contact you via <strong>email</strong>, <strong>phone call</strong>, or <strong>direct messaging</strong> regarding the next steps.</p><div><p class=\"font-medium text-sky-50 mb-1\">Important Information:</p><ul class=\"list-disc pl-5 space-y-1\"><li>All interviews and evaluations are conducted directly by the institute.</li><li>TuitionToAll does not manage or participate in the selection process.</li><li>TuitionToAll is not responsible for any issues during or after the selection process.</li><li>If selected, you will receive an official email via TuitionToAll on behalf of the institute.</li><li>The institute may also contact you separately based on their procedures.</li><li>After selection, all responsibilities and workload are handled by the institute.</li></ul></div><p>You can track your application status from your dashboard.</p></div>";

    const dialogData:ConfirmationDialogData = {
      title: 'Apply for This Vacancy?',
      message: 'Once you apply, your application will be recorded and sent to the institute for review. You won’t be able to submit another application for this vacancy.',
      confirmText: 'Ok',
      confirmButtonClass: 'btn-mini-primary btn-success',
      type: 'success',
      icon: Check
    }
    this.alertService.triggerSuccessConfirmationAlert(dialogData).subscribe({
      next: (res)=>{
        if(res){
          if (this.vacancy && this.currentUser.details) {
            this.applicationService.createApplication(this.vacancy.id).subscribe({
              next: (res)=>{
                if(res){
                  this.checkIfApplied();
                  this.alertService.triggerInformationAlert(title,informationDescription);
                }
              },
              error: (err)=>{
                this.alertService.triggerErrorAlert(err.error.message);
                this.checkIfApplied();
              }
            })
          }
        }
      }
    });
  }

  private triggerLoading():void{
    this.loading = !this.loading;
  }
}
