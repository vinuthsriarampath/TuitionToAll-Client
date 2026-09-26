import {Component, inject, OnInit} from '@angular/core';
import {
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  LucideAngularModule,
  RotateCw
} from "lucide-angular";
import {PageLayoutComponent} from "@core/layouts";
import {UserHelper} from '@shared/utils/helpers/user-helper';
import {User} from '@features/user/dtos/responses/user';
import {UserService} from '@features/user/services/user/user.service';
import {Router, RouterLink} from '@angular/router';
import {BadgeComponent, CardShellComponent} from '@shared/ui';
import {DatePipe, UpperCasePipe} from '@angular/common';
import {StatCard2Component} from '@shared/ui/stat-card-2/stat-card-2.component';
import {NoContentComponent} from '@shared/components/no-content/no-content.component';
import {StudentService} from '@features/student/services/student/student.service';
import {StudentBootstrapResponse} from '@features/student/dtos/responses/student-bootstrap-response';
import {AlertService} from '@core/services/alerts/alert.service';
import {StudentDashboardStats} from '@features/student/dtos/responses/student-dashboard-stats';
import {Assignment} from '@features/assignments/dtos/response/assignment';
import {RecentEnrollmentResponse} from '@features/student/dtos/responses/recent-enrollment-response';
import {UpcomingAssignmentResponse} from '@features/assignments/dtos/response/upcoming-assignment-response';
import {RecentResultsResponse} from '@features/student/dtos/responses/recent-results-response';
import {AssignmentType} from '@features/assignments/enums/assignment-type';
import {getGreet} from '@shared/utils/helpers/date-helper';

@Component({
  selector: 'app-student-dashboard',
  imports: [
    LucideAngularModule,
    PageLayoutComponent,
    CardShellComponent,
    DatePipe,
    StatCard2Component,
    RouterLink,
    NoContentComponent,
    BadgeComponent,
    UpperCasePipe
  ],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent implements OnInit {
  protected isLoading: boolean = false;
  protected student!: User;

  protected bootstrapData!:StudentBootstrapResponse;
  protected stats!: StudentDashboardStats;
  protected upcomingAssignments!: UpcomingAssignmentResponse[];
  protected recentEnrollments!: RecentEnrollmentResponse[];
  protected recentResults!: RecentResultsResponse[];

  private readonly router = inject(Router);
  private readonly userService = inject(UserService);
  private readonly studentService = inject(StudentService);
  private readonly alertService = inject(AlertService);

  ngOnInit(): void {
    this.student = this.userService.getCurrentUser();
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    this.isLoading = true;
    this.studentService.getBootstrapData().subscribe({
      next: (res) => {
        if (res.data){
          this.bootstrapData = res.data;
          this.stats = this.bootstrapData.dashboardStats;
          this.upcomingAssignments = this.bootstrapData.upcomingAssignments;
          this.recentEnrollments = this.bootstrapData.recentEnrollments;
          this.recentResults = this.bootstrapData.recentResults;
        }
        this.isLoading = false;
      },
      error: err => {
        this.isLoading = false;
        this.alertService.triggerErrorAlert(err.error.message ?? 'Failed to load dashboard data. Please try again later.');
      }
    });
  }

  protected refreshDashboard(): void {
    this.loadDashboardData();
  }

  protected viewAssignment(assignment: UpcomingAssignmentResponse): void {
    if (assignment.assignmentType === AssignmentType.MODULE) {
      this.router.navigate([
        '/stu', 'my-learnings',
        'courses', assignment.courseId,
        'batches', assignment.batchId,
        'modules', assignment.moduleId,
        'assignments', assignment.assignmentId,
        'view'
      ], {
        queryParams: {
          type: 'module',
          moduleId: assignment.moduleId
        }
      });
      return;
    }

    if (assignment.assignmentType === AssignmentType.CHAPTER) {
      this.router.navigate(['/stu', 'my-learnings',
        'courses', assignment.courseId,
        'batches', assignment.batchId,
        'modules', assignment.moduleId,
        'chapters', assignment.chapterId,
        'assignments', assignment.assignmentId,
        'view'
      ], {
        queryParams: {
          type: 'chapter',
          chapterId: assignment.chapterId
        }
      });
    }
  }

  protected navigateToCourse(courseId: number): void {
    this.router.navigate(['/my-learnings', courseId]);
  }

  protected navigateToAssignments(): void {
    this.router.navigate(['/assignments']);
  }

  // Helper & Icons Binding
  protected readonly UserHelper = UserHelper;
  protected readonly Calendar = Calendar;
  protected readonly RotateCw = RotateCw;
  protected readonly Clock = Clock;
  protected readonly BookOpen = BookOpen;
  protected readonly CheckCircle = CheckCircle;
  protected readonly Award = Award;
  protected readonly ArrowRight = ArrowRight;
  protected readonly AssignmentType = AssignmentType;
  protected readonly getGreet = getGreet;
}
