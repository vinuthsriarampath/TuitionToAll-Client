import {Component, inject, input, OnInit} from '@angular/core';
import {CourseService} from '../../../../core/services/course/course.service';
import {Course} from '../../../../core/models/course';
import {environment} from '../../../../../environment/environment.development';
import {AlertService} from '../../../../core/services/alerts/alert.service';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {CourseFilter} from '../../../course/dtos/request/course-filter';
import {CourseCardComponent} from '../../components/course-card/course-card.component';

@Component({
  selector: 'app-user-courses',
  imports: [
    MatProgressSpinner,
    CourseCardComponent
  ],
  templateUrl: './user-courses.component.html',
  styleUrl: './user-courses.component.css'
})
export class UserCoursesComponent implements OnInit{

  protected readonly courses:Course[] = [];
  protected loading:boolean = false;

  userId = input.required<number>();

  private readonly courseService:CourseService = inject(CourseService);
  private readonly alertService:AlertService = inject(AlertService);
  protected readonly environment = environment;

  ngOnInit(): void {
    const filters = new CourseFilter()
    filters.status = 'published';
    this.courseService.getAllCoursesByInstituteId(this.userId(),filters).subscribe({
      next: (res)=>{
        this.triggerLoading();
        if(res) this.courses.push(...res);
      },
      error: (err)=>{
        this.alertService.triggerErrorAlert(err.error.message);
      }
    })
    this.triggerLoading();
  }


  triggerLoading(){
    this.loading = !this.loading;
  }

  isNewCourse(createdAt:Date):boolean{
    return createdAt < new Date(new Date().setDate(new Date().getDate()-7));
  }
}
