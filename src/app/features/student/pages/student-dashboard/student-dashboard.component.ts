import {Component, inject, OnInit} from '@angular/core';
import {Calendar, LucideAngularModule, RotateCw} from "lucide-angular";
import {PageLayoutComponent} from "@core/layouts";
import {UserHelper} from '@shared/utils/helpers/user-helper';
import {User} from '@features/user/dtos/responses/user';
import {UserService} from '@features/user/services/user/user.service';

@Component({
  selector: 'app-student-dashboard',
    imports: [
        LucideAngularModule,
        PageLayoutComponent
    ],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent implements OnInit{

  student!:User;

  private readonly userService = inject(UserService);

  ngOnInit(): void {
    this.student = this.userService.getCurrentUser()
  }

  protected readonly UserHelper = UserHelper;
  protected readonly Calendar = Calendar;
  protected readonly RotateCw = RotateCw;
}
