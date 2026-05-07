import {Component, inject, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {AnnouncementVisibility} from '../../../../../../../core/enums/AnnouncementVisibility';
import {
  AnnouncementCreateStatus
} from '../../../../../../../core/dto/request-dto/announcement/enums/AnnouncementCreateStatus';
import {QuillEditorComponent} from 'ngx-quill';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule, Megaphone} from 'lucide-angular';
import {CourseService} from '../../../../../../../core/services/course/course.service';
import {BatchService} from '../../../../../../../core/services/batch/batch.service';
import {AlertService} from '../../../../../../../core/services/alerts/alert.service';
import {Course} from '../../../../../../../core/models/course';
import {Batch} from '../../../../../../../core/models/batch';
import {
  AnnouncementCreateRequest
} from '../../../../../../../core/dto/request-dto/announcement/AnnouncementCreateRequest';
import {AnnouncementService} from '../../../../../../../core/services/announcements/announcement.service';
import {getDateTime} from '../../../../../../../core/helpers/date-helper';
import {CourseFilter} from '../../../../../../../core/dto/request-dto/course/course-filter';
import {CourseStatus} from '../../../../../../../core/enums/course-status';
import {UserService} from '../../../../../../../core/services/user/user.service';
import {Institute} from '../../../../../../../core/models/user-models/institute';

@Component({
  selector: 'app-create-announcement-dialog',
  imports: [
    QuillEditorComponent,
    ReactiveFormsModule,
    LucideAngularModule,
  ],
  templateUrl: './create-announcement-dialog.component.html',
  styleUrl: './create-announcement-dialog.component.css'
})
export class CreateAnnouncementDialogComponent implements OnInit{

  protected form!:FormGroup;
  protected loading:boolean = false;

  private instituteId!:number | null;

  private readonly dialogRef:MatDialogRef<CreateAnnouncementDialogComponent> = inject(MatDialogRef<CreateAnnouncementDialogComponent>);
  private readonly formBuilder:FormBuilder = inject(FormBuilder);
  private readonly announcementService:AnnouncementService = inject(AnnouncementService)
  private readonly courseService:CourseService = inject(CourseService);
  private readonly batchService:BatchService = inject(BatchService);
  private readonly alertService:AlertService = inject(AlertService);
  private readonly userService:UserService = inject(UserService)

  visibilities:AnnouncementVisibility[] = Object.values(AnnouncementVisibility);
  statuses:AnnouncementCreateStatus[] = Object.values(AnnouncementCreateStatus);

  courses:Course[] = [];
  batches:Batch[] = [];

  ngOnInit(): void {
    this.form = this.initializeForm();
    this.onVisibilityChange();
    this.onCourseChange();
    this.getCurrentInstituteId();
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

  private initializeForm():FormGroup{
    return this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      visibility: ['', Validators.required],
      status: ['', Validators.required],
      expireAt: [getDateTime(0,0,5), Validators.required],
      courseId: [null],
      batchId: [null]
    });
  }

  modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
      ['clean'],
    ]
  };

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

  protected onCancel(): void{
    this.dialogRef.close();
  }

  protected onRest():void{
    this.form = this.initializeForm();
  }

  onVisibilityChange(){
    this.form.get('visibility')?.valueChanges.subscribe(value => {
      if (value === AnnouncementVisibility.COURSE) {
        this.loadAllPublishedCourses();
      }

      if (value === AnnouncementVisibility.BATCH) {
        this.loadAllPublishedCourses();

        const courseId = this.form.get('courseId')?.value;
        if (courseId) {
          this.loadAllBatchesByCourse(courseId);
        }
      }
    });
  }

  onCourseChange(){

    this.form.get('courseId')?.valueChanges.subscribe(courseId => {
      if (
        this.form.get('visibility')?.value === AnnouncementVisibility.BATCH &&
        courseId
      ) {
        this.loadAllBatchesByCourse(courseId);
      }
    });
  }

  protected onSubmit(){
    if (this.form.invalid) return;

    this.triggerLoading();

    const request:AnnouncementCreateRequest = this.form.value;

    if(request){
      this.announcementService.createAnnouncement(request).subscribe({
        next:(res)=>{
          if(res.data){
            this.triggerLoading();
            this.onCancel();
          }
        },
        error:(err) =>{
          this.triggerLoading();

          const errors = err.error?.errors;

          console.log(errors);

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
  }

  get selectedCourseTitle(): string | null {
    const courseId = this.form.get('courseId')?.value;

    const course = this.courses.find(c => c.id == courseId) ;

    return course ? course.title ?? null : null;
  }

  get selectedBatchName(): string | null {
    const batchId = this.form.get('batchId')?.value;

    const batch = this.batches.find(b => b.id == batchId);

    return batch ? batch.name ?? null : null;
  }

  protected triggerLoading():void{
    this.loading = !this.loading;

    if (this.loading) {
      this.form.disable({emitEvent:false});
    } else {
      this.form.enable();
    }
  }

  protected readonly Megaphone = Megaphone;
}
