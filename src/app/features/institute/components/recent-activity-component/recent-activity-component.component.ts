import { Component } from '@angular/core';
import {
  ArrowRight,
  Calendar,
  CheckCircle,
  CreditCard,
  GraduationCap,
  LucideAngularModule,
  LucideIconData, UserPlus
} from 'lucide-angular';
import {CardShellComponent} from '@shared/ui';

export interface ActivityItem {
  id: number;
  time: string;
  icon: LucideIconData;
  message: string;
  highlightText?: string;
  postText?: string;
}

@Component({
  selector: 'app-recent-activity-component',
  imports: [
    LucideAngularModule,
    CardShellComponent
  ],
  templateUrl: './recent-activity-component.component.html',
  styleUrl: './recent-activity-component.component.css'
})
export class RecentActivityComponentComponent {
  activities: ActivityItem[] = [
    { id:1,time: '12:42 PM', icon: UserPlus, message: '', highlightText: '8 new students', postText: 'enrolled in Java Programming' },
    { id:2,time: '11:35 AM', icon: Calendar, message: 'New batch', highlightText: '“Spring Boot — August”', postText: 'created' },
    { id:3,time: '10:18 AM', icon: CreditCard, message: 'Payment received from', highlightText: '12 students' },
    { id:4,time: '09:45 AM', icon: GraduationCap, message: 'New teacher added to', highlightText: 'Angular Advanced' },
    { id:5,time: 'Yesterday', icon: CheckCircle, message: '', highlightText: '5 students', postText: 'completed Web Development' }
  ];
  protected readonly ArrowRight = ArrowRight;
}
