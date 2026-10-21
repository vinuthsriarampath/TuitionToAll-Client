import {Component, inject, OnInit} from '@angular/core';
import {AnnouncementService} from '../../services/announcements/announcement.service';
import {AnnouncementResponse} from '../../dtos/response/AnnouncementResponse';
import {AlertService} from '@core/services/alerts/alert.service';
import {ArrowUpDown, Eye, LucideAngularModule} from 'lucide-angular';
import {AnnouncementFilterRequest} from '../../dtos/request/AnnouncementFilterRequest';
import {DatePipe, NgClass, TitleCasePipe} from '@angular/common';
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
import {BasePaginatedFilterComponent} from '@shared/utils/base/BasePaginatedFilterComponent';
import {PaginationRequest} from '@shared/utils/requests/PaginationRequest';
import {Observable} from 'rxjs';
import {FormGroup, NonNullableFormBuilder} from '@angular/forms';
import {FilterFieldConfig} from '@shared/utils/config/filter-config';
import {CardShellComponent} from '@shared/ui';
import {FilterToolbarComponent} from '@shared/components/filter-toolbar/filter-toolbar.component';
import {MatTooltip} from '@angular/material/tooltip';

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
    MatNoDataRow,
    CardShellComponent,
    FilterToolbarComponent,
    MatTooltip,
    TitleCasePipe
  ],
  templateUrl: './course-announcement-view.component.html',
  styleUrl: './course-announcement-view.component.css'
})
export class CourseAnnouncementViewComponent extends BasePaginatedFilterComponent<AnnouncementResponse, AnnouncementFilterRequest> {

  protected courseId!:number;
  protected batchId?:number;

  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly announcementService:AnnouncementService = inject(AnnouncementService);
  private readonly fb = inject(NonNullableFormBuilder)

  filterForm:FormGroup = this.fb.group({
    courseId: [this.courseId],
    batchId: [this.batchId],
    status: [undefined as AnnouncementStatus | undefined],
    visibility: [undefined as AnnouncementVisibility | undefined],
  });

  filterFields:FilterFieldConfig[] = [
    {key:'status', label:'Status', type:'select', options: Object.values(AnnouncementStatus).map(status => ({label: status, value: status}))},
    {key:'visibility', label:'Visibility', type:'select', options: Object.values(AnnouncementVisibility).map(visibility => ({label: visibility, value: visibility}))},
  ];

  protected columns:string[] = ['id','title','status','visibility','expireAt','createdDate','actions'];
  protected sortByFields:string[] = ['created_date'];


  constructor(){
    super();
    this.activatedRoute.paramMap.subscribe(params =>{
      this.courseId = Number.parseInt(params.get('courseId') ?? '');
      this.batchId = Number.parseInt(params.get('batchId') ?? '');
    })
  }

  fetchApiData(pagination:PaginationRequest, filters:AnnouncementFilterRequest):Observable<any>{
    filters.courseId = this.courseId;
    if(this.batchId){
      filters.batchId = this.batchId;
    }
    return this.announcementService.getAllAnnouncements(pagination,filters);
  }

  protected override mapFormToFilter(formValues: Record<string, any>): AnnouncementFilterRequest {
    return {
      courseId: formValues['courseId'] || undefined,
      batchId: formValues['batchId'] || undefined,
      status: formValues['status'] || undefined,
      visibility: formValues['visibility'] || undefined
    };
  }

  protected readonly AnnouncementStatus = AnnouncementStatus;
  protected readonly AnnouncementVisibility = AnnouncementVisibility;
  protected readonly Eye = Eye;
  protected readonly ArrowUpDown = ArrowUpDown;
}
