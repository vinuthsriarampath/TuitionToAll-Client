import {Component, effect, inject, OnDestroy, OnInit} from '@angular/core';
import {PageLayoutComponent} from '@core/layouts';
import {KpiCardComponent} from '@features/institute/components/kpi-card/kpi-card.component';
import {
  BookOpen,
  Calendar,
  GraduationCap,
  LucideAngularModule,
  Megaphone,
  Plus,
  RotateCw,
  UserPlus,
  Users,
  Wallet
} from 'lucide-angular';
import {EnrollmentCartComponent} from '@features/institute/components/enrollment-cart/enrollment-cart.component';
import {
  DistributionChartComponent
} from '@features/institute/components/distribution-chart/distribution-chart.component';
import {
  ActiveBatchesTableComponent
} from '@features/institute/components/active-batches-table/active-batches-table.component';
import {
  PerformanceWidgetComponent
} from '@features/institute/components/performance-widget/performance-widget.component';
import {
  RecentActivityComponentComponent
} from '@features/institute/components/recent-activity-component/recent-activity-component.component';
import {RouterLink} from '@angular/router';
import {InstituteService} from '@features/institute/services/institute/institute.service';
import {AlertService} from '@core/services/alerts/alert.service';
import {InstituteBootstrapResponse} from '@features/institute/dtos/response/institute-bootstrap-response';
import {
  InstituteDashboardWebsocketService
} from '@features/institute/services/institute-dashboard-websocket/institute-dashboard-websocket.service';
import {UserService} from '@features/user/services/user/user.service';
import {
  EnrollmentMetricsUpdatedResponse
} from '@features/student-batch-enrollment/responses/EnrollmentMetricsUpdatedResponse';
import {
  InstituteTeacherMetricsUpdatedResponse
} from '@features/institute/dtos/response/institute-teacher-responses/institute-teacher-metrics-updated-response';

@Component({
  selector: 'app-home-page',
  imports: [
    PageLayoutComponent,
    KpiCardComponent,
    EnrollmentCartComponent,
    DistributionChartComponent,
    ActiveBatchesTableComponent,
    LucideAngularModule,
    PerformanceWidgetComponent,
    RecentActivityComponentComponent,
    RouterLink
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit, OnDestroy{

  protected bootstrapData = new InstituteBootstrapResponse();
  protected isLoading:boolean = false;

  private readonly dashboardWebSocketService = inject(InstituteDashboardWebsocketService);
  private readonly instituteService = inject(InstituteService);
  private readonly alertService = inject(AlertService);
  private readonly userService = inject(UserService);

  ngOnInit(): void {
    this.fetchBootstrapData();
    const instituteId = this.userService.getCurrentUser().details.id;
    this.dashboardWebSocketService.subscribeToInstituteEnrollmentMetrics(instituteId);
    this.dashboardWebSocketService.subscribeToTeacherMetrics(instituteId);
  }

  ngOnDestroy(): void {
      this.dashboardWebSocketService.unsubscribeFromInstituteEnrollmentMetrics();
      this.dashboardWebSocketService.unsubscribeToTeacherMetrics();
  }

  constructor() {

    effect(() => {
      const update = this.dashboardWebSocketService.enrollmentMetricsUpdated();
      if (!update) {return;}
      this.applyEnrollmentMetricsUpdate(update);
    });

    effect(() => {
      const update= this.dashboardWebSocketService.teacherMetricsUpdated();
      console.log('Teacher metrics update received:', update);
      if(!update){return;}
      this.applyTeacherMetricsUpdate(update);
    });
  }

  private fetchBootstrapData():void{
    this.triggerLoading();
    this.instituteService.getInstituteBootstrapData().subscribe({
      next: (res) => {
        if(res.data){
          this.bootstrapData = res.data;
        }
        this.triggerLoading();
      },
      error: () => {
        this.triggerLoading();
        this.alertService.triggerErrorAlert('Failed to load dashboard data. Please try again later.');
      }
    })
  }

  protected refreshDashboard(): void {
    this.fetchBootstrapData();
  }

  private triggerLoading():void{
    this.isLoading = !this.isLoading;
  }

  private applyEnrollmentMetricsUpdate(update: EnrollmentMetricsUpdatedResponse): void {
    this.bootstrapData.kpiStats = {
      ...this.bootstrapData.kpiStats,
      activeStudents: update.studentKpi,
      revenue: update.revenueKpi
    };
    this.bootstrapData.overallEnrollment = update.overallEnrollment;
    this.bootstrapData.enrollmentDistribution = update.enrollmentDistribution;
  }

  private applyTeacherMetricsUpdate(update: InstituteTeacherMetricsUpdatedResponse): void {
    this.bootstrapData.kpiStats = {
      ...this.bootstrapData.kpiStats,
      activeTeachers: update.activeTeachers
    };
  }

  protected readonly Users = Users;
  protected readonly BookOpen = BookOpen;
  protected readonly Calendar = Calendar;
  protected readonly GraduationCap = GraduationCap;
  protected readonly Wallet = Wallet;
  protected readonly UserPlus = UserPlus;
  protected readonly Plus = Plus;
  protected readonly RotateCw = RotateCw;
  protected readonly Megaphone = Megaphone;
}
