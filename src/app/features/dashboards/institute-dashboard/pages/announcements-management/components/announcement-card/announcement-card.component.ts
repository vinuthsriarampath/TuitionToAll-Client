import {Component, input} from '@angular/core';
import {AnnouncementResponse} from '../../../../../../../core/dto/response-dto/AnnouncementResponse';
import {QuillEditorComponent} from 'ngx-quill';
import {DatePipe} from '@angular/common';
import {BadgeComponent} from '../../../../../../../shared/ui/badge/badge.component';
import {CardShellComponent} from '../../../../../../../shared/ui/card-shell/card-shell.component';
import {FormsModule} from '@angular/forms';
import {AnnouncementStatus} from '../../../../../../../core/enums/AnnouncementStatus';
import {AnnouncementVisibility} from '../../../../../../../core/enums/AnnouncementVisibility';
import {BookOpen, CalendarClock, LucideAngularModule, Pin, Users} from 'lucide-angular';

@Component({
  selector: 'app-announcement-card',
  imports: [
    QuillEditorComponent,
    DatePipe,
    BadgeComponent,
    CardShellComponent,
    FormsModule,
    LucideAngularModule
  ],
  templateUrl: './announcement-card.component.html',
  styleUrl: './announcement-card.component.css'
})
export class AnnouncementCardComponent {

  announcement = input.required<AnnouncementResponse>();
  protected readonly AnnouncementStatus = AnnouncementStatus;
  protected readonly AnnouncementVisibility = AnnouncementVisibility;
  protected readonly Pin = Pin;
  protected readonly Users = Users;
  protected readonly BookOpen = BookOpen;
  protected readonly CalendarClock = CalendarClock;
}
