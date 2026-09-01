import {Component} from '@angular/core';
import {Home, LucideAngularModule} from 'lucide-angular';
import {SidebarMenuItem} from '@features/dashboards/types/sidebar-menu-item';
import {DashboardShellComponent} from '@features/dashboards/components/dashboard-shell/dashboard-shell.component';

@Component({
  selector: 'app-teacher-shell',
  imports: [
    LucideAngularModule,
    DashboardShellComponent
  ],
  templateUrl: './teacher-shell.component.html',
  styleUrl: './teacher-shell.component.css'
})
export class TeacherShellComponent{
  protected menus : SidebarMenuItem[] = [
    {
      title: "Dashboard",
      icon: Home,
      route: "/tch/dashboard"
    }
  ];
}
