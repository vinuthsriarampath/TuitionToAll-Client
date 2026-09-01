import {Component} from '@angular/core';
import {Book, Home, LucideAngularModule, Megaphone, User2} from "lucide-angular";
import {SidebarMenuItem} from '@features/dashboards/types/sidebar-menu-item';
import {DashboardShellComponent} from '@features/dashboards/components/dashboard-shell/dashboard-shell.component';

@Component({
  selector: 'app-institute-shell',
  imports: [
    LucideAngularModule,
    DashboardShellComponent,
  ],
  templateUrl: './institute-shell.component.html',
  styleUrl: './institute-shell.component.css'
})
export class InstituteShellComponent{
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
  ];
}
