import {Component, inject, OnInit, signal} from '@angular/core';
import {PageLayoutComponent} from '@core/layouts';
import {BadgeComponent, CardHeaderComponent, CardShellComponent} from '@shared/ui';
import {DatePipe, NgOptimizedImage} from '@angular/common';
import {LucideAngularModule, Star} from 'lucide-angular';
import {StudentService} from '@features/student/services/student/student.service';
import {StudentLearningResponse} from '@features/student/dtos/responses/student-learning-response';
import {AlertService} from '@core/services/alerts/alert.service';
import {NoContentComponent} from '@shared/components/no-content/no-content.component';
import {environment} from '@env/environment.development';
import {LoaderOverlayComponent} from '@shared/components/loader-overlay/loader-overlay.component';

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
    LoaderOverlayComponent
  ],
  templateUrl: './student-learnings.component.html',
  styleUrl: './student-learnings.component.css'
})
export class StudentLearningsComponent implements OnInit{

  protected loading:boolean = false;
  protected myLearning = signal<StudentLearningResponse[]>([])

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

  protected readonly Star = Star;
  protected readonly environment = environment;
}
