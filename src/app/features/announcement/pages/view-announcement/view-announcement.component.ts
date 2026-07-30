import {Component, inject, OnInit} from '@angular/core';
import {AnnouncementService} from '../../services/announcements/announcement.service';
import {ActivatedRoute} from '@angular/router';
import {AnnouncementResponse} from '../../dtos/response/AnnouncementResponse';
import {AlertService} from '@core/services/alerts/alert.service';
import {AnnouncementVisibility} from '../../enums/AnnouncementVisibility';
import {DatePipe, NgClass} from '@angular/common';
import {BookOpen, CalendarClock, LucideAngularModule, Pin, Users} from 'lucide-angular';
import {AnnouncementStatus} from '../../enums/AnnouncementStatus';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {QuillEditorComponent} from 'ngx-quill';
import {PageLayoutComponent} from '@core/layouts';
import {CardShellComponent} from '@shared/ui';

@Component({
  selector: 'app-view-announcement',
  imports: [
    NgClass,
    DatePipe,
    LucideAngularModule,
    FormsModule,
    QuillEditorComponent,
    ReactiveFormsModule,
    PageLayoutComponent,
    CardShellComponent
  ],
  templateUrl: './view-announcement.component.html',
  styleUrl: './view-announcement.component.css'
})
export class ViewAnnouncementComponent implements OnInit {

  private announcementId!:number;
  protected announcement!:AnnouncementResponse;

  private readonly announcementService:AnnouncementService = inject(AnnouncementService);
  private readonly activatedRoute:ActivatedRoute = inject(ActivatedRoute);
  private readonly alertService = inject(AlertService);

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.announcementId = Number.parseInt(params.get('announcementId') ?? '');
      this.loadAnnouncementDetails(this.announcementId);
    });
  }

  private loadAnnouncementDetails(announcementId:number){
    this.announcementService.getAnnouncementById(announcementId).subscribe({
      next: (res)=>{
        if(res.data){
          this.announcement = res.data;
        }
      },
      error: (err)=>{
       this.alertService.triggerErrorAlert(err.error.message);
      }
    })
  }

  protected readonly AnnouncementVisibility = AnnouncementVisibility;
  protected readonly BookOpen = BookOpen;
  protected readonly Pin = Pin;
  protected readonly AnnouncementStatus = AnnouncementStatus;
  protected readonly Users = Users;
  protected readonly CalendarClock = CalendarClock;
}
