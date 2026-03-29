import {Component, OnInit} from '@angular/core';
import {FlowbiteService} from '../../../core/services/flowbite/flowbite.service';
import {initFlowbite} from 'flowbite';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {Book, ChartPie, LucideAngularModule, User2} from 'lucide-angular';
import {UserService} from '../../../core/services/user/user.service';
import {AlertService} from '../../../core/services/alerts/alert.service';
import {User} from '../../../core/models/user-models/user';
import {NgOptimizedImage} from '@angular/common';
import {environment} from '../../../environment/environment.development';

@Component({
  selector: 'app-institute-dashboard',
  imports: [
    RouterLink,
    LucideAngularModule,
    RouterOutlet,
    NgOptimizedImage,
    RouterLinkActive
  ],
  templateUrl: './institute-dashboard.component.html',
  styleUrl: './institute-dashboard.component.css'
})
export class InstituteDashboardComponent implements OnInit{

  readonly ChartPie = ChartPie;
  readonly Book = Book;

  institute:User = new User();

  constructor(
    private readonly flowbiteService: FlowbiteService,
    private readonly userService:UserService,
    private readonly alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

    this.userService.currentUser$.subscribe(user => {
      if(user) {
        this.institute = structuredClone(user)
      }else {
        this.alertService.triggerErrorAlert("User not found");
      }
    })
  }


  protected readonly environment = environment;
  protected readonly User2 = User2;
}
