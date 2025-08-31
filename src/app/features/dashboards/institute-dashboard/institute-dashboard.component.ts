import {Component, OnInit} from '@angular/core';
import {FlowbiteService} from '../../../core/services/flowbite/flowbite.service';
import {initFlowbite} from 'flowbite';
import {RouterLink, RouterOutlet} from '@angular/router';
import {LucideAngularModule, ChartPie, Book} from 'lucide-angular';
import {UserService} from '../../../core/services/user/user.service';
import {AuthenticationService} from '../../../core/services/auth/authentication.service';
import {Institute} from '../../../core/models/user-models/sub-user-models/institute';
import {AlertService} from '../../../core/services/alerts/alert.service';

@Component({
  selector: 'app-institute-dashboard',
  imports: [
    RouterLink,
    LucideAngularModule,
    RouterOutlet
  ],
  templateUrl: './institute-dashboard.component.html',
  styleUrl: './institute-dashboard.component.css'
})
export class InstituteDashboardComponent implements OnInit{

  readonly ChartPie = ChartPie;
  readonly Book = Book;

  institute:Institute = {}

  constructor(
    private readonly flowbiteService: FlowbiteService,
    private readonly userService:UserService,
    private readonly authService: AuthenticationService,
    private readonly alertService: AlertService
  ) {
    authService.verifyToken().subscribe({
      next: (res) =>{
        this.institute = res.data as Institute;
      },
      error: (err)=>{
        this.alertService.triggerErrorAlert(err.error.message);
      }
    })
  }

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }


}
