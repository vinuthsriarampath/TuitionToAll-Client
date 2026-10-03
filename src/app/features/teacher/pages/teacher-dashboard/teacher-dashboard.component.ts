import {Component, inject, OnInit, signal} from '@angular/core';
import {PageLayoutComponent} from '@core/layouts';
import {
  ArrowDownRight, ArrowUpRight, BookOpen,
  Calendar,
  ChevronRight,
  Clock, FileCheck, Layers,
  LucideAngularModule,
  RotateCw,
  Users,
  Video
} from 'lucide-angular';
import {UserService} from '@features/user/services/user/user.service';
import {User} from '@features/user/dtos/responses/user';
import {UserHelper} from '@shared/utils/helpers/user-helper';
import {getGreet} from '@shared/utils/helpers/date-helper';
import {Router, RouterLink} from '@angular/router';
import {DatePipe} from '@angular/common';
import {CardShellComponent} from '@shared/ui';
import {TeacherService} from '@features/teacher/services/teacher/teacher.service';
import {DashboardStats} from '@shared/utils/response/dashboard-stats';
import {TeacherBasicCourseResponse} from '@features/course/dtos/response/teacher-basic-course-response';
import {NonGradedSubmissionResponse} from '@features/grading/dtos/responses/non-graded-submission-response';
import {ScheduleLectureResponse} from '@features/schedule-lectures/dtos/response/ScheduleLectureResponse';
import {StatCard2Component} from '@shared/ui/stat-card-2/stat-card-2.component';
import {NoContentComponent} from '@shared/components/no-content/no-content.component';
import {
  ScheduleLectureCardComponent
} from '@features/schedule-lectures/components/schedule-lecture-card/schedule-lecture-card.component';
import {
  AssignmentSubmissionStatusBadgeComponent
} from '@features/assignment-submission/components/assignment-submission-status-badge/assignment-submission-status-badge.component';
import {AlertService} from '@core/services/alerts/alert.service';

@Component({
  selector: 'app-teacher-dashboard',
  imports: [
    PageLayoutComponent,
    LucideAngularModule,
    DatePipe,
    CardShellComponent,
    RouterLink,
    StatCard2Component,
    NoContentComponent,
    ScheduleLectureCardComponent,
    AssignmentSubmissionStatusBadgeComponent
  ],
  templateUrl: './teacher-dashboard.component.html',
  styleUrl: './teacher-dashboard.component.css'
})
export class TeacherDashboardComponent implements OnInit{
  private readonly userService = inject(UserService);
  private readonly teacherService = inject(TeacherService);
  private readonly alertService = inject(AlertService);

  protected isLoading = signal<boolean>(false);
  protected teacher = signal<User | null>(null);

  // Simplified Quick Counters
  protected ongoingAssignedBatchesCount!:DashboardStats;
  protected publishedAssignedModulesCount!:DashboardStats;
  protected pendingEvaluationsCount!:DashboardStats;

  protected assignedPublishedCourses:TeacherBasicCourseResponse[] = [];
  protected nonGradedSubmissions:NonGradedSubmissionResponse[] = [];
  protected upcomingLectureSchedules:ScheduleLectureResponse[] = [];

  ngOnInit(): void {
    this.teacher.set(this.userService.getCurrentUser());
    this.fetchDashboardData();
  }

  protected fetchDashboardData(): void {
    this.isLoading.set(true);
    this.teacherService.getTeacherBootstrapData().subscribe({
      next: (res) => {
        if(res.data){
          let data = res.data;
          this.ongoingAssignedBatchesCount = data.stats.ongoingAssignedBatchesCount;
          this.publishedAssignedModulesCount = data.stats.publishedAssignedModulesCount;
          this.pendingEvaluationsCount = data.stats.pendingEvaluationsCount;
          this.assignedPublishedCourses = data.assignedPublishedCourses;
          this.nonGradedSubmissions = data.nonGradedSubmissions;
          this.upcomingLectureSchedules = data.upcomingLectureSchedules;
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.alertService.triggerErrorAlert(err.error.message ?? "Failed to load dashboard data");
      }
    });
  }

  protected refreshDashboard(): void {
    this.fetchDashboardData();
  }

  // protected gradeSubmission(submissionId: number): void {
  //   console.warn('method not implemented')
  // }

  // Icon References[cite: 1]
  protected readonly BookOpen = BookOpen;
  protected readonly FileCheck = FileCheck;
  protected readonly Calendar = Calendar;
  protected readonly RotateCw = RotateCw;
  protected readonly ChevronRight = ChevronRight;
  protected readonly Layers = Layers;
  protected readonly UserHelper = UserHelper;
  protected readonly getGreet = getGreet;
  protected readonly Users = Users;
}
