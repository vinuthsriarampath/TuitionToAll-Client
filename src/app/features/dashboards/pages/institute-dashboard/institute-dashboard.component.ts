import {Component, inject, OnInit} from '@angular/core';
import {FlowbiteService} from '@core/services/flowbite/flowbite.service';
import {initFlowbite} from 'flowbite';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {Book, ChevronDownIcon, Home, LucideAngularModule, Megaphone, Menu, User2} from 'lucide-angular';
import {UserService} from '@features/user/services/user/user.service';
import {AlertService} from '@core/services/alerts/alert.service';
import {User} from '../../../user/dtos/responses/user';
import {NgClass, NgOptimizedImage} from '@angular/common';
import {environment} from '@env/environment.development';
import {SidebarMenuItem} from '../../types/sidebar-menu-item';
import {BreadcrumbComponent} from '@shared/components/breadcrumb/breadcrumb.component';
import {AuthenticationService} from '@features/auth/services/auth/authentication.service';
import {UserHelper} from '@shared/utils/helpers/user-helper';

@Component({
  selector: 'app-institute-dashboard',
  imports: [
    RouterLink,
    LucideAngularModule,
    RouterOutlet,
    NgOptimizedImage,
    NgClass,
    RouterLinkActive,
    BreadcrumbComponent
  ],
  templateUrl: './institute-dashboard.component.html',
  styleUrl: './institute-dashboard.component.css'
})
export class InstituteDashboardComponent implements OnInit{

  institute:User = new User(); // Current User


  private readonly flowbiteService: FlowbiteService = inject(FlowbiteService);
  private readonly userService: UserService = inject(UserService);
  private readonly alertService: AlertService = inject(AlertService);
  private readonly authService:AuthenticationService = inject(AuthenticationService);

  ngOnInit(): void {
    //Initialize flowbite
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

    // Get current user
    this.userService.currentUser$.subscribe(user => {
      if(user) {
        this.institute = structuredClone(user)
      }else {
        this.alertService.triggerErrorAlert("User not found");
      }
    });
  }

  // Sidebar lucid icons
  protected readonly environment = environment;
  protected readonly dropDownIcon = ChevronDownIcon;
  protected readonly menu = Menu;

  // Sidebar functionality state variables
  protected sidebarOpen: boolean = false;
  protected subMenuOpen: boolean = false;
  protected profileMenuOpen: boolean = false;

  // Sidebar menu item list
  protected menus : SidebarMenuItem[] = [
    {
      title: "Dashboard",
      icon: Home,
      route: "/ins/dashboard"
    },
    {
      title: "Courses",
      icon: Book,
      route: "course-mgt"
    },
    {
      title: "Teachers",
      icon: User2,
      route: "teacher-mgt"
    },
    {
      title: "Announcements",
      icon: Megaphone,
      route: "announcements-mgt"
    }
  ]

  protected logout():void{
    this.authService.logout();
  }

  protected readonly UserHelper = UserHelper;
}
