import {Component, inject, OnInit} from '@angular/core';
import {PageLayoutComponent} from '@core/layouts';
import {Calendar, LucideAngularModule, RotateCw} from 'lucide-angular';
import {UserService} from '@features/user/services/user/user.service';
import {User} from '@features/user/dtos/responses/user';
import {UserHelper} from '@shared/utils/helpers/user-helper';

@Component({
  selector: 'app-teacher-dashboard',
  imports: [
    PageLayoutComponent,
    LucideAngularModule
  ],
  templateUrl: './teacher-dashboard.component.html',
  styleUrl: './teacher-dashboard.component.css'
})
export class TeacherDashboardComponent implements OnInit{

  teacher!:User;

  private readonly userService = inject(UserService);

  ngOnInit(): void {
      this.teacher = this.userService.getCurrentUser()
  }


  protected readonly Calendar = Calendar;
  protected readonly RotateCw = RotateCw;
  protected readonly UserHelper = UserHelper;
}
