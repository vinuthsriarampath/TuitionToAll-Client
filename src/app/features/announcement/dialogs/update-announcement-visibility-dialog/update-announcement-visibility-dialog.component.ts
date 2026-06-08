import {Component, Inject, inject, OnInit} from '@angular/core';
import {Eye, LucideAngularModule} from 'lucide-angular';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass} from '@angular/common';
import {AnnouncementVisibility} from '../../enums/AnnouncementVisibility';
import {AnnouncementService} from '../../services/announcements/announcement.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AlertService} from '../../../../core/services/alerts/alert.service';
import {Course} from '../../../../core/models/course';
import {Batch} from '../../../../core/models/batch';
import {CourseFilter} from '../../../course/dtos/request/course-filter';
import {CourseStatus} from '../../../../core/enums/course-status';
import {Institute} from '../../../profile/dtos/response/institute';
import {UserService} from '../../../profile/services/user/user.service';
import {BatchService} from '../../../../core/services/batch/batch.service';
import {CourseService} from '../../../../core/services/course/course.service';
import {AnnouncementVisibilityUpdateRequest} from '../../dtos/request/AnnouncementVisibilityUpdateRequest';
import {DialogLayoutComponent} from '../../../../core/layouts/dialog-layout/dialog-layout.component';

export interface UpdateAnnouncementVisibilityDialogData {
  id:number;
  visibility:AnnouncementVisibility;
  courseId?:number;
  batchId?:number;
}

@Component({
  selector: 'app-update-announcement-visibility-dialog',
  imports: [
    LucideAngularModule,
    ReactiveFormsModule,
    NgClass,
    DialogLayoutComponent
  ],
  templateUrl: './update-announcement-visibility-dialog.component.html',
  styleUrl: './update-announcement-visibility-dialog.component.css'
})
export class UpdateAnnouncementVisibilityDialogComponent implements OnInit{

  protected loading:boolean = false;
  protected form!:FormGroup;
  protected courses:Course[] = [];
  protected batches:Batch[] = [];
  protected visibilities:AnnouncementVisibility[] = Object.values(AnnouncementVisibility);

  protected readonly originalData!:UpdateAnnouncementVisibilityDialogData;

  private instituteId!:number | null;

  private readonly dialogRef:MatDialogRef<UpdateAnnouncementVisibilityDialogComponent> = inject(MatDialogRef<UpdateAnnouncementVisibilityDialogComponent>);
  private readonly formBuilder:FormBuilder = inject(FormBuilder);
  private readonly announcementService:AnnouncementService= inject(AnnouncementService);
  private readonly alertService:AlertService = inject(AlertService);
  private readonly userService:UserService = inject(UserService);
  private readonly courseService:CourseService = inject(CourseService)
  private readonly batchService:BatchService = inject(BatchService);

  constructor(@Inject(MAT_DIALOG_DATA) private readonly data:UpdateAnnouncementVisibilityDialogData) {
    this.originalData = data;
    this.form = this.initializeForm(data);
  }

  ngOnInit(): void {
        this.getCurrentInstituteId();
        this.onVisibilityChange();
        this.onCourseChange();
        this.loadAllPublishedCourses();
        if(this.originalData.visibility== AnnouncementVisibility.BATCH && this.originalData.courseId && this.originalData.batchId ){
          this.loadAllBatchesByCourse(this.originalData.courseId);
        }
  }

  private initializeForm(formData:UpdateAnnouncementVisibilityDialogData):FormGroup{
    return this.formBuilder.group({
      visibility: [formData.visibility,Validators.required],
      courseId: [formData.courseId],
      batchId: [formData.batchId]
    })
  }

  private getCurrentInstituteId():void{
    let institute = new Institute();
    this.userService.currentUser$.subscribe({
      next: (user)=>{
        if (user){
          institute = user.details as Institute;
        }
      }
    })
    this.instituteId = institute.id ?? null;
  }

  private loadAllPublishedCourses(){

    if (this.instituteId == null) {
      this.alertService.triggerErrorAlert("Institute not found");
      return;
    }

    const courseFilter:CourseFilter = new CourseFilter();
    courseFilter.status= CourseStatus.PUBLISHED

    this.courseService.getAllCoursesByInstituteId(this.instituteId,courseFilter).subscribe({
      next: (res) =>{
        if(res){
          this.courses = res ?? [];
        }
      },
      error: (err) => {
        this.alertService.triggerErrorAlert(err.error.message);
      }
    })
  }

  private loadAllBatchesByCourse(courseId:number){
    this.batchService.getAllBatchesByCourseId(courseId).subscribe({
      next: (res) => {
        if (res.data){
          this.batches = res.data;
        }
      },
      error: (err) => {
        this.alertService.triggerErrorAlert(err.error.message);
      }
    })
  }

  private onVisibilityChange(){
    const visibilityControl = this.form.get('visibility');
    const courseIdControl = this.form.get('courseId');
    const batchIdControl = this.form.get('batchId');

    visibilityControl?.valueChanges.subscribe((visibility: AnnouncementVisibility) => {

      const isOriginalVisibility:boolean = visibility === this.originalData.visibility;

      // Reset / restore form values
      switch (visibility) {

        case AnnouncementVisibility.COURSE: {
          if (isOriginalVisibility) {
            courseIdControl?.setValue(this.originalData.courseId);
            batchIdControl?.setValue(this.originalData.batchId);
          } else {
            courseIdControl?.setValue(this.originalData.courseId);
            batchIdControl?.setValue(null);
          }
          this.loadAllPublishedCourses();

          break;
        }

        case AnnouncementVisibility.BATCH: {
          if (isOriginalVisibility) {
            courseIdControl?.setValue(this.originalData.courseId);
            batchIdControl?.setValue(this.originalData.batchId);
          }

          this.loadAllPublishedCourses();

          const courseId = courseIdControl?.value;

          if (courseId) {
            this.loadAllBatchesByCourse(courseId);
          }

          break;
        }

        default: {
          if (isOriginalVisibility) {
            courseIdControl?.setValue(this.originalData.courseId);
            batchIdControl?.setValue(this.originalData.batchId);
          } else {
            courseIdControl?.setValue(null);
            batchIdControl?.setValue(null);
          }

          break;
        }
      }
    });
  }

  private onCourseChange(){

    this.form.get('courseId')?.valueChanges.subscribe(courseId => {
      if (
        this.form.get('visibility')?.value === AnnouncementVisibility.BATCH &&
        courseId
      ) {
        this.loadAllBatchesByCourse(courseId);
      }
    });
  }

  onSubmit() {
     if(this.form.invalid) return;

     this.triggerLoading();

     const request:AnnouncementVisibilityUpdateRequest = this.form.value;

     this.announcementService.updateAnnouncementVisibility(this.originalData.id, request).subscribe({
       next:(res)=>{
         if(res.data){
           this.triggerLoading();
           this.dialogRef.close(res.data);
         }
       },
       error:(err) =>{
         this.triggerLoading();

         const errors = err.error?.errors;

         if (errors) {
           errors.forEach((e: any) => {
             this.form.get(e.field)?.setErrors({
               server: e.message
             });
           });
         }else{
           this.form.setErrors({server: err.error.message()});
         }
       }
     })
  }

  onReset(){
    this.form = this.initializeForm(this.originalData);
  }
  onCancel() {
      this.dialogRef.close();
  }

  triggerLoading(){
    this.loading = !this.loading;

    if(this.loading){
      this.form.disable({emitEvent:false});
    }else{
      this.form.enable();
    }
  }

  protected readonly Eye = Eye;
  protected readonly AnnouncementVisibility = AnnouncementVisibility;
}
