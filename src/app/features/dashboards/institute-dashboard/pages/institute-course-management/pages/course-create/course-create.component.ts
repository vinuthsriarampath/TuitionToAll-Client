import {Component, ElementRef, ViewChild} from '@angular/core';
import {LucideAngularModule, Undo2} from 'lucide-angular';
import {FormsModule} from '@angular/forms';
import {CourseLevel} from '../../../../../../../core/enums/course-level';
import {CourseCategory} from '../../../../../../../core/enums/course-category';
import {CourseStatus} from '../../../../../../../core/enums/course-status';
import {CourseLanguage} from '../../../../../../../core/enums/course-language';
import {CourseMode} from '../../../../../../../core/enums/course-mode';
import {CourseCreate} from '../../../../../../../core/dto/request-dto/course/course-create';
import {NgForOf, NgIf, TitleCasePipe} from '@angular/common';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {CourseService} from '../../../../../../../core/services/course/course.service';
import {AlertService} from '../../../../../../../core/services/alerts/alert.service';
import {Router} from '@angular/router';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

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
  ],
  templateUrl: './course-create.component.html',
  styleUrl: './course-create.component.css'
})
export class CourseCreateComponent {

  protected readonly window = window;
  protected readonly undo2 = Undo2

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
    price:0.00,
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
}
