import {Component, inject, input, OnInit} from '@angular/core';
import {SidebarMenuItem} from '@features/dashboards/types/sidebar-menu-item';
import {BreadcrumbComponent} from '@shared/components/breadcrumb/breadcrumb.component';
import {ChevronDown, LucideAngularModule, Menu} from 'lucide-angular';
import {NgClass, NgOptimizedImage} from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {UserHelper} from '@shared/utils/helpers/user-helper';
import {User} from '@features/user/dtos/responses/user';
import {UserService} from '@features/user/services/user/user.service';
import {AlertService} from '@core/services/alerts/alert.service';
import {AuthenticationService} from '@features/auth/services/auth/authentication.service';

@Component({
  selector: 'app-dashboard-shell',
  imports: [
    BreadcrumbComponent,
    LucideAngularModule,
    NgOptimizedImage,
    RouterLinkActive,
    RouterOutlet,
    RouterLink,
    NgClass
  ],
  templateUrl: './dashboard-shell.component.html',
  styleUrl: './dashboard-shell.component.css'
})
export class DashboardShellComponent implements OnInit{
  menus = input.required<SidebarMenuItem[]>();

  user:User = new User();

  private readonly userService: UserService = inject(UserService);
  private readonly alertService: AlertService = inject(AlertService);
  private readonly authService:AuthenticationService = inject(AuthenticationService);

  ngOnInit(): void {
    this.userService.currentUser$.subscribe(user => {
      if(user) {
        this.user = structuredClone(user)
      }else {
        this.alertService.triggerErrorAlert("User not found");
      }
    });
  }

  protected logout():void{
    this.authService.logout();
  }

  protected sidebarOpen: boolean = false;
  protected subMenuOpen: boolean = false;
  protected profileMenuOpen: boolean = false;
  protected readonly Menu = Menu;
  protected readonly ChevronDown = ChevronDown;

  protected readonly UserHelper = UserHelper;
}
