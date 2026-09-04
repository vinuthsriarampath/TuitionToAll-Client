import {Component, inject, OnInit, signal, ViewChild} from '@angular/core';
import {PageLayoutComponent} from '@core/layouts';
import {BadgeComponent, CardHeaderComponent, CardShellComponent} from '@shared/ui';
import {DatePipe, NgClass, NgOptimizedImage, TitleCasePipe} from '@angular/common';
import {Calendar, LucideAngularModule, Star, Zap} from 'lucide-angular';
import {StudentService} from '@features/student/services/student/student.service';
import {StudentLearningResponse} from '@features/student/dtos/responses/student-learning-response';
import {AlertService} from '@core/services/alerts/alert.service';
import {NoContentComponent} from '@shared/components/no-content/no-content.component';
import {environment} from '@env/environment.development';
import {LoaderOverlayComponent} from '@shared/components/loader-overlay/loader-overlay.component';
import {EnrollmentHistoryResponse} from '@features/student-batch-enrollment/dtos/responses/enrollment-history-response';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {PageTitleComponent} from '@shared/components/page-title/page-title.component';

@Component({
  selector: 'app-student-learnings',
  imports: [
    PageLayoutComponent,
    CardShellComponent,
    CardHeaderComponent,
    NgOptimizedImage,
    BadgeComponent,
    LucideAngularModule,
    NoContentComponent,
    DatePipe,
    LoaderOverlayComponent,
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent,
    PageTitleComponent,
    NgClass,
    TitleCasePipe
  ],
  templateUrl: './student-learnings.component.html',
  styleUrl: './student-learnings.component.css'
})
export class StudentLearningsComponent implements OnInit{
  @ViewChild('drawer') drawer!: MatSidenav;

  protected loading:boolean = false;
  protected historyLoading:boolean = false;
  protected myLearning = signal<StudentLearningResponse[]>([]);
  protected enrollmentHistory = signal<EnrollmentHistoryResponse | null>(null);

  private readonly studentService = inject(StudentService);
  private readonly alertService = inject(AlertService);

  ngOnInit(): void {
      this.loadMyLearning();
  }

  private loadMyLearning(){
    this.loading = true;
    this.studentService.getMyLearning().subscribe({
      next: res => {
        if (res.data){
          this.myLearning.set(res.data)
        }
        this.loading = false;
      },
      error: () => {
        this.alertService.triggerErrorAlert("Failed to load your learning data. Please try again later.");
        this.loading = false;
      }
    })
  }

  onHistoryClick(courseId: number){
    this.drawer.open().then(() => {
      this.historyLoading = true;
      this.studentService.getEnrollmentHistory(courseId).subscribe({
        next: res => {
          if (res.data){
            this.enrollmentHistory.set(res.data);
          }
          this.historyLoading = false;
        },
        error: () => {
          this.alertService.triggerErrorAlert("Failed to load enrollment history. Please try again later.");
          this.historyLoading = false;
        }
      });
    });
  }

  onCloseHistoryDrawer(){
    this.drawer.close().then(() => {
      this.enrollmentHistory.set(null);
    })
  }

  protected readonly Star = Star;
  protected readonly environment = environment;
  protected readonly Zap = Zap;
  protected readonly Calendar = Calendar;
}
