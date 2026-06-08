import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../../../../../../../core/models/course';
import {CourseService} from '../../../../../../../core/services/course/course.service';
import {AlertService} from '../../../../core/services/alerts/alert.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ArrowLeft, LucideAngularModule} from 'lucide-angular';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {NgForOf, NgIf, TitleCasePipe} from '@angular/common';
import {CourseLevel} from '../../../../../../../core/enums/course-level';
import {CourseMode} from '../../../../../../../core/enums/course-mode';
import {CourseStatus} from '../../../../../../../core/enums/course-status';
import {CourseCategory} from '../../../../../../../core/enums/course-category';
import {CourseLanguage} from '../../../../../../../core/enums/course-language';
import {environment} from '../../../../environment/environment.development';
import {CourseUpdate} from '../../dtos/request/course-update';

@Component({
  selector: 'app-course-update',
  imports: [
    FormsModule,
    LucideAngularModule,
    MatButtonToggle,
    MatButtonToggleGroup,
    MatProgressSpinner,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    TitleCasePipe
  ],
  templateUrl: './course-update.component.html',
  styleUrl: './course-update.component.css'
})
export class CourseUpdateComponent implements OnInit{
  protected readonly ArrowLeft = ArrowLeft;

  protected originalCourse:Course = new Course();
  protected editableCourse:CourseUpdate = new Course();

  protected readonly window = globalThis.window;

  protected readonly courseLevels = Object.values(CourseLevel);
  protected readonly courseModes = Object.values(CourseMode);
  protected readonly courseStatuses = Object.values(CourseStatus);
  protected readonly courseCategories = Object.values(CourseCategory);
  protected readonly courseLanguages = Object.values(CourseLanguage);

  private readonly activatedRoute:ActivatedRoute = inject(ActivatedRoute);
  private readonly courseService:CourseService = inject(CourseService);
  private readonly alertService = inject(AlertService);
  protected loading:boolean=false;
  protected imageUrl: string = '';
  protected selectedFile: File | null = null;

  @ViewChild('fileInput') fileInput!:ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const courseId = params.get('courseId') ?? '';

      this.loadCourseDetails(Number.parseInt(courseId));
    })
  }

  loadCourseDetails(courseId: number){
    if (!courseId) return;

    this.courseService.getCourseById(courseId).subscribe({
      next: (res) => {
        this.editableCourse=res;
        if(res.thumbnail){
          this.imageUrl = `${environment.COURSE_API}${res.thumbnail}`;
          this.selectedFile = new File([], 'thumbnail');
        }
        this.originalCourse = {...this.editableCourse};
      },
      error: (err) => {
          this.alertService.triggerErrorAlert(err.error.message())
      }
    })
  }

  onSubmit() {
      if(this.editableCourse){
        this.triggerLoading();

        if(this.selectedFile){
          this.courseService.updateCourse(this.originalCourse.id!,this.editableCourse,this.selectedFile).subscribe({
            next: ()=>{
              this.alertService.triggerSuccessAlert("Course Updated Successfully");
              this.triggerLoading();
              this.window.history.back();
            },
            error: (error)=>{
              this.alertService.triggerErrorAlert(error.error.message())
            }
          })
        }else{
          this.courseService.updateCourse(this.originalCourse.id!,this.editableCourse).subscribe({
            next: ()=>{
              this.alertService.triggerSuccessAlert("Course Updated Successfully");
              this.loadCourseDetails(this.originalCourse.id!);
              this.triggerLoading();
            },
            error: (error)=>{
              this.alertService.triggerErrorAlert(error.error.message())
            }
          })
        }

      }
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
    if (this.originalCourse.thumbnail){
      this.imageUrl = `${environment.COURSE_API}${this.originalCourse.thumbnail}`;
      this.selectedFile = new File([], 'thumbnail');
    }else {
      this.imageUrl = '';
      this.selectedFile = null;
    }

    if(this.fileInput){
      this.fileInput.nativeElement.value = '';
    }

  }

  protected resetForm() {
    this.editableCourse = {...this.originalCourse};
  }

  private triggerLoading(){
    this.loading = !this.loading;
  }
}
