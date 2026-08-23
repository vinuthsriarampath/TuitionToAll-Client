import {Component, inject, OnInit} from '@angular/core';
import {PageLayoutComponent} from '@core/layouts';
import {KpiCardComponent} from '@features/institute/components/kpi-card/kpi-card.component';
import {
  BookOpen,
  Calendar,
  GraduationCap,
  LucideAngularModule, Megaphone,
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
export class HomePageComponent implements OnInit{

  protected bootstrapData = new InstituteBootstrapResponse();
  protected isLoading:boolean = false;


  private readonly instituteService = inject(InstituteService);
  private readonly alertService = inject(AlertService);

  ngOnInit(): void {
      this.fetchBootstrapData();
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
