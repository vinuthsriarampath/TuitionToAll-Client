import {Component, ElementRef, ViewChild} from '@angular/core';
import {ArrowLeft, CloudUpload, LucideAngularModule} from 'lucide-angular';
import {FormsModule} from '@angular/forms';
import {CourseCreate} from '../../dtos/request/course-create';
import {NgClass, NgForOf, NgIf, TitleCasePipe} from '@angular/common';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {AlertService} from '@core/services/alerts/alert.service';
import {Router} from '@angular/router';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {CourseLevel} from '@features/course/enums/course-level';
import {CourseStatus} from '@features/course/enums/course-status';
import {CourseCategory} from '@features/course/enums/course-category';
import {CourseLanguage} from '@features/course/enums/course-language';
import {CourseMode} from '@features/course/enums/course-mode';
import {CourseService} from '@features/course/services/course/course.service';
import {PageLayoutComponent} from '@core/layouts';
import {CardShellComponent} from '@shared/ui';

@Component({
  selector: 'app-course-create',
  imports: [
    LucideAngularModule,
    FormsModule,
    NgForOf,
    TitleCasePipe,
    MatButtonToggleGroup,
    MatButtonToggle,
    NgIf,
    MatProgressSpinner,
    PageLayoutComponent,
    CardShellComponent,
    NgClass,
  ],
  templateUrl: './course-create.component.html',
  styleUrl: './course-create.component.css'
})
export class CourseCreateComponent {

  protected readonly window = globalThis.window;
  protected readonly ArrowLeft = ArrowLeft;

  protected readonly courseLevels = Object.values(CourseLevel);
  protected readonly courseModes = Object.values(CourseMode);
  protected readonly courseStatuses = Object.values(CourseStatus);
  protected readonly courseCategories = Object.values(CourseCategory);
  protected readonly courseLanguages = Object.values(CourseLanguage);

  loading:boolean=false;

  imageUrl:string ='';
  selectedFile: File | null = null;

  @ViewChild('fileInput') fileInput!:ElementRef<HTMLInputElement>;

  constructor(private readonly courseService:CourseService,private readonly alertService:AlertService,private readonly router:Router) {
  }

  courseCreateRequest:CourseCreate = {
    title:"",
    description:"",
    durationInHours:1,
    price: 0,
    level:CourseLevel.BEGINNER,
    category:CourseCategory.OTHER,
    status:CourseStatus.DRAFT,
    language:CourseLanguage.ENGLISH,
    mode:CourseMode.OFFLINE
  };

  onSubmit() {
    if (this.courseCreateRequest){
      this.triggerLoading();

      if(this.selectedFile){
        this.courseService.createCourse(this.courseCreateRequest,this.selectedFile).subscribe({
          next: ()=>{
            this.alertService.triggerSuccessAlert("Course Created Successfully");
            this.router.navigate(['/ins/dashboard/course-mgt'])
            this.resetForm();
            this.triggerLoading();
          },
          error: (error)=>{
            this.alertService.triggerErrorAlert(error.error.message())
          }
        })
      }else {
        this.courseService.createCourse(this.courseCreateRequest).subscribe({
          next: ()=>{
            this.alertService.triggerSuccessAlert("Course Created Successfully");
            this.router.navigate(['/ins/dashboard/course-mgt'])
            this.resetForm();
            this.triggerLoading();
          },
          error: (error)=>{
            this.alertService.triggerErrorAlert(error.error.message())
          }
        })
      }
    }
  }

  resetForm() {
    this.courseCreateRequest={
      title:"",
      description:"",
      durationInHours:1,
      price: 0,
      level:CourseLevel.BEGINNER,
      category:CourseCategory.OTHER,
      status:CourseStatus.DRAFT,
      language:CourseLanguage.ENGLISH,
      mode:CourseMode.OFFLINE
    }
    this.resetUpload();
  }

  selectImage(file:File){
    this.imageUrl = URL.createObjectURL(file);
    this.selectedFile = file;
  }

  onImageSelect(event:Event):void{
    const input = event.target as HTMLInputElement;
    if(input.files && input.files.length > 0){
      const file = input.files[0];
      this.selectImage(file);
    }
  }

  resetUpload(){
    this.imageUrl = '';
    this.selectedFile = null;

    if(this.fileInput){
      this.fileInput.nativeElement.value = '';
    }

  }

  triggerLoading(){
    this.loading = !this.loading;
  }

  protected readonly CloudUpload = CloudUpload;
}
