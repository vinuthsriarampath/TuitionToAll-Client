import {Component} from '@angular/core';
import {Home, LucideAngularModule} from 'lucide-angular';
import {SidebarMenuItem} from '@features/dashboards/types/sidebar-menu-item';
import {DashboardShellComponent} from '@features/dashboards/components/dashboard-shell/dashboard-shell.component';

@Component({
  selector: 'app-student-shell',
  imports: [
    LucideAngularModule,
    DashboardShellComponent
  ],
  templateUrl: './student-shell.component.html',
  styleUrl: './student-shell.component.css'
})
export class StudentShellComponent{
  protected menus : SidebarMenuItem[] = [
    {
      title: "Dashboard",
      icon: Home,
      route: "/stu/dashboard"
    }
  ];
}
