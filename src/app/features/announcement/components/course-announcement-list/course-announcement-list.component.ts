import {Component, inject, input, OnInit} from '@angular/core';
import {AnnouncementService} from '../../services/announcements/announcement.service';
import {AnnouncementResponse} from '../../dtos/response/AnnouncementResponse';
import {AlertService} from '@core/services/alerts/alert.service';
import {AnnouncementFilterRequest} from '../../dtos/request/AnnouncementFilterRequest';
import {AnnouncementStatus} from '../../enums/AnnouncementStatus';
import {LucideAngularModule, Pin} from 'lucide-angular';
import {NgClass} from '@angular/common';
import {RouterLink} from '@angular/router';
import {CardShellComponent} from '@shared/ui';
import {NoContentComponent} from '@shared/components/no-content/no-content.component';

@Component({
  selector: 'app-course-announcement-list',
  imports: [
    LucideAngularModule,
    NgClass,
    RouterLink,
    CardShellComponent,
    NoContentComponent
  ],
  templateUrl: './course-announcement-list.component.html',
  styleUrl: './course-announcement-list.component.css'
})
export class CourseAnnouncementListComponent implements OnInit{
  protected announcements:AnnouncementResponse[] = [];
  protected loading:boolean = false;

  protected totalAnnouncements:number = 0;

  private readonly announcementService:AnnouncementService = inject(AnnouncementService);
  private readonly alertService = inject(AlertService);

  courseId = input.required<number>();
  recentAnnouncements = input.required<boolean>();

  ngOnInit(): void {
    this.loadAnnouncements();
  }

  private loadAnnouncements(){
    if(this.recentAnnouncements()){
      this.triggerLoading();
      const filters:AnnouncementFilterRequest = new AnnouncementFilterRequest();
      filters.status = AnnouncementStatus.PUBLISHED;
      filters.courseId = this.courseId();

      this.announcementService.getAllAnnouncements(0,10,'desc',['is_pinned','published_date'],filters).subscribe({
        next: (res)=>{
          if(res.data){
            this.announcements = res.data;
            this.totalAnnouncements = res.totalElements ?? 0;
            this.triggerLoading();
          }
        },
        error: (err)=>{
          this.alertService.triggerErrorAlert(err.error.message);
          this.triggerLoading();
        }
      })
    }
  }

  isPinnedAndActive(expireAt: string, pinned: boolean): boolean {
    return pinned && new Date(expireAt).getTime() > Date.now();
  }

  protected calculatePublishedDate(date: string): string {
    const publishedDate = new Date(date);
    const now = new Date();

    const diffInMs = now.getTime() - publishedDate.getTime();

    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);

    // <= 59 seconds
    if (seconds <= 59) {
      return 'now';
    }

    // 1 - 59 minutes
    if (minutes <= 59) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    }

    // 1 - 23 hours
    if (hours <= 23) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }

    // 1 - 29 days
    if (days < 30) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }

    // 1 - 12 months
    if (months <= 12) {
      return `${months} month${months > 1 ? 's' : ''} ago`;
    }

    // More than 1 year
    return publishedDate.toLocaleDateString();
  }

  private triggerLoading():void{
    this.loading = !this.loading;
  }

  protected readonly Pin = Pin;
  protected readonly Number = Number;
}
