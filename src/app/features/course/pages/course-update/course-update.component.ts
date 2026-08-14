import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AlertService} from '@core/services/alerts/alert.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ArrowLeft, CloudUpload, LucideAngularModule} from 'lucide-angular';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {NgClass, NgForOf, NgIf, TitleCasePipe} from '@angular/common';
import {environment} from '@env/environment.development';
import {CourseUpdate} from '../../dtos/request/course-update';
import {Course} from '@features/course/dtos/response/course';
import {CourseLevel} from '@features/course/enums/course-level';
import {CourseMode} from '@features/course/enums/course-mode';
import {CourseStatus} from '@features/course/enums/course-status';
import {CourseCategory} from '@features/course/enums/course-category';
import {CourseLanguage} from '@features/course/enums/course-language';
import {CourseService} from '@features/course/services/course/course.service';
import {CardShellComponent} from '@shared/ui';
import {PageLayoutComponent} from '@core/layouts';

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
    TitleCasePipe,
    NgClass,
    CardShellComponent,
    PageLayoutComponent
  ],
  templateUrl: './course-update.component.html',
  styleUrl: './course-update.component.css'
})
export class CourseUpdateComponent implements OnInit{
  protected readonly ArrowLeft = ArrowLeft;

  protected originalCourse:Course = new Course();
  protected editableCourse:CourseUpdate = new CourseUpdate();

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
        this.originalCourse = res;
        this.editableCourse = {...res};
        if(res.thumbnail){
          this.imageUrl = `${environment.COURSE_API}${res.thumbnail}`;
          this.selectedFile = new File([], 'thumbnail');
        }
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

  protected readonly CloudUpload = CloudUpload;
}
