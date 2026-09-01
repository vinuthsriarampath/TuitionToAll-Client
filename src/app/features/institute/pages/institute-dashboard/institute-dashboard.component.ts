import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {
  BookOpen,
  Calendar,
  GraduationCap,
  LucideAngularModule,
  Megaphone, Plus, RotateCw,
  UserPlus,
  Users,
  Wallet
} from 'lucide-angular';
import {UserService} from '@features/user/services/user/user.service';
import {AlertService} from '@core/services/alerts/alert.service';
import {
  ActiveBatchesTableComponent
} from '@features/institute/components/active-batches-table/active-batches-table.component';
import {
  DistributionChartComponent
} from '@features/institute/components/distribution-chart/distribution-chart.component';
import {EnrollmentCartComponent} from '@features/institute/components/enrollment-cart/enrollment-cart.component';
import {KpiCardComponent} from '@features/institute/components/kpi-card/kpi-card.component';
import {PageLayoutComponent} from '@core/layouts';
import {
  PerformanceWidgetComponent
} from '@features/institute/components/performance-widget/performance-widget.component';
import {
  RecentActivityComponentComponent
} from '@features/institute/components/recent-activity-component/recent-activity-component.component';
import {
  InstituteDashboardWebsocketService
} from '@features/institute/services/institute-dashboard-websocket/institute-dashboard-websocket.service';
import {InstituteService} from '@features/institute/services/institute/institute.service';
import {
  InstituteDashboardStoreService
} from '@features/institute/services/institute-dashboard-store/institute-dashboard-store.service';

@Component({
  selector: 'app-institute-dashboard',
  imports: [
    RouterLink,
    LucideAngularModule,
    ActiveBatchesTableComponent,
    DistributionChartComponent,
    EnrollmentCartComponent,
    KpiCardComponent,
    PageLayoutComponent,
    PerformanceWidgetComponent,
    RecentActivityComponentComponent
  ],
  templateUrl: './institute-dashboard.component.html',
  styleUrl: './institute-dashboard.component.css'
})
export class InstituteDashboardComponent implements OnInit, OnDestroy{
  private readonly dashboardWebSocketService = inject(InstituteDashboardWebsocketService);
  private readonly instituteService = inject(InstituteService);
  private readonly alertService = inject(AlertService);
  private readonly userService = inject(UserService);
  private readonly store = inject(InstituteDashboardStoreService);

  protected data = this.store.dashboard;
  protected isLoading:boolean = false;

  ngOnInit(): void {
    this.fetchBootstrapData();
    const instituteId = this.userService.getCurrentUser().details.id;
    this.dashboardWebSocketService.connect(instituteId);
  }

  ngOnDestroy(): void {
    this.dashboardWebSocketService.disconnect();
  }

  private fetchBootstrapData():void{
    this.triggerLoading();
    this.instituteService.getInstituteBootstrapData().subscribe({
      next: (res) => {
        if(res.data){
          this.store.setBootstrapData(res.data);
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

  protected readonly Wallet = Wallet;
  protected readonly GraduationCap = GraduationCap;
  protected readonly Calendar = Calendar;
  protected readonly BookOpen = BookOpen;
  protected readonly Users = Users;
  protected readonly UserPlus = UserPlus;
  protected readonly Megaphone = Megaphone;
  protected readonly Plus = Plus;
  protected readonly RotateCw = RotateCw;
}
