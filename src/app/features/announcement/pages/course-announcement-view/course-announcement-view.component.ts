import {Component, inject, OnInit} from '@angular/core';
import {AnnouncementService} from '../../services/announcements/announcement.service';
import {AnnouncementResponse} from '../../dtos/response/AnnouncementResponse';
import {AlertService} from '@core/services/alerts/alert.service';
import {Eye, LucideAngularModule} from 'lucide-angular';
import {AnnouncementFilterRequest} from '../../dtos/request/AnnouncementFilterRequest';
import {DatePipe, NgClass} from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {PageTitleComponent} from '@shared/components/page-title/page-title.component';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {AnnouncementStatus} from '../../enums/AnnouncementStatus';
import {AnnouncementVisibility} from '../../enums/AnnouncementVisibility';
import {NoContentComponent} from '@shared/components/no-content/no-content.component';
import {MatPaginator, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-course-announcement-view',
  imports: [
    LucideAngularModule,
    NgClass,
    RouterLink,
    PageTitleComponent,
    MatColumnDef,
    MatTable,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    DatePipe,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    NoContentComponent,
    MatPaginator,
    MatNoDataRow
  ],
  templateUrl: './course-announcement-view.component.html',
  styleUrl: './course-announcement-view.component.css'
})
export class CourseAnnouncementViewComponent implements OnInit {

  protected courseId!:number;
  protected loading:boolean= false;

  // table related

  protected columns:string[] = ['id','title','status','visibility','expireAt','createdDate','actions'];
  protected dataSource = new MatTableDataSource<AnnouncementResponse>([]);
  protected pageIndex:number = 0;
  protected pageSize:number = 10;
  protected totalElements:number = 0;

  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly announcementService:AnnouncementService = inject(AnnouncementService);
  private readonly alertService = inject(AlertService);

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params =>{
      this.courseId = Number.parseInt(params.get('courseId') ?? '');
      this.fetchAnnouncements();
    })
  }

  private fetchAnnouncements():void{
    const filters:AnnouncementFilterRequest = new AnnouncementFilterRequest();
    filters.courseId = this.courseId;
    this.triggerLoading();
    this.announcementService.getAllAnnouncements(0,10,'desc',['is_pinned','published_date'],filters).subscribe({
      next: (res)=>{
        if(res.data){
          this.dataSource.data = res.data ?? [];
          this.pageIndex = res.page ?? 0;
          this.pageSize = res.size ?? 10;
          this.totalElements = res.totalElements ?? 0;
          this.triggerLoading();
        }
      },
      error: (err) => {
        this.alertService.triggerErrorAlert(err.error.message);
        this.triggerLoading();
      }
    })
  }

  private triggerLoading():void{
    this.loading = !this.loading;
  }

  protected onPageChange(event:PageEvent):void{
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchAnnouncements();
  }

  protected readonly AnnouncementStatus = AnnouncementStatus;
  protected readonly AnnouncementVisibility = AnnouncementVisibility;
  protected readonly Eye = Eye;
}
