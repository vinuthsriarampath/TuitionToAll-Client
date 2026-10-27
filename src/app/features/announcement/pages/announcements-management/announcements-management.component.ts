import {Component, inject} from '@angular/core';
import {AnnouncementService} from '../../services/announcements/announcement.service';
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
  MatTable
} from '@angular/material/table';
import {AnnouncementResponse} from '../../dtos/response/AnnouncementResponse';
import {ArrowUpDown, Edit, Eye, LucideAngularModule} from 'lucide-angular';
import {MatTooltip} from '@angular/material/tooltip';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {DatePipe, NgClass} from '@angular/common';
import {AnnouncementStatus} from '../../enums/AnnouncementStatus';
import {AnnouncementVisibility} from '../../enums/AnnouncementVisibility';
import {
  UpdateAnnouncementDialogComponent
} from '../../dialogs/update-announcement-dialog/update-announcement-dialog.component';
import {RouterLink} from '@angular/router';
import {PageLayoutComponent} from '@core/layouts';
import {
  CreateAnnouncementDialogComponent
} from '@features/announcement/dialogs/create-announcement-dialog/create-announcement-dialog.component';
import {NoContentComponent} from '@shared/components/no-content/no-content.component';
import {PaginationRequest} from '@shared/utils/requests/PaginationRequest';
import {BasePaginatedFilterComponent} from '@shared/utils/base/BasePaginatedFilterComponent';
import {AnnouncementFilterRequest} from '@features/announcement/dtos/request/AnnouncementFilterRequest';
import {Observable} from 'rxjs';
import {FormGroup, NonNullableFormBuilder} from '@angular/forms';
import {FilterFieldConfig} from '@shared/utils/config/filter-config';
import {FilterToolbarComponent} from '@shared/components/filter-toolbar/filter-toolbar.component';

@Component({
  selector: 'app-announcements-management',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRowDef,
    MatRow,
    LucideAngularModule,
    MatTooltip,
    MatPaginator,
    NgClass,
    DatePipe,
    RouterLink,
    PageLayoutComponent,
    NoContentComponent,
    MatNoDataRow,
    FilterToolbarComponent
  ],
  templateUrl: './announcements-management.component.html',
  styleUrl: './announcements-management.component.css'
})
export class AnnouncementsManagementComponent extends BasePaginatedFilterComponent<AnnouncementResponse, AnnouncementFilterRequest>{

  private readonly announcementService :AnnouncementService = inject(AnnouncementService);
  private readonly dialog:MatDialog = inject(MatDialog);
  private readonly fb = inject(NonNullableFormBuilder);

  filterForm:FormGroup = this.fb.group({
    status: [undefined as AnnouncementStatus | undefined],
    visibility: [undefined as AnnouncementVisibility | undefined]
  })

  filterFields: FilterFieldConfig[] = [
    {key:'status', label:'Status', type:'select', options: Object.values(AnnouncementStatus).map(status => ({label: status, value: status}))},
    {key:'visibility', label:'Visibility', type:'select', options: Object.values(AnnouncementVisibility).map(visibility => ({label: visibility, value: visibility}))},
  ]

  // table related variables
  protected readonly columns:string[] = ['id','title','visibility','status','createdDate','lastModifiedDate','actions'];
  sortByFields:string[] = ['created_date'];

  fetchApiData(pagination:PaginationRequest, filters:AnnouncementFilterRequest):Observable<any>{
    return this.announcementService.getAllAnnouncements(pagination,filters);
  }

  protected openCreateAnnouncementDialog(){
    const dialogRef =  this.dialog.open(CreateAnnouncementDialogComponent,{
      maxWidth: '100vh',
      width: '500%',
      panelClass: 'create-announcement-dialog'
    });

    dialogRef.afterClosed().subscribe(()=>{
      this.clearFilters();
    })
  }

  protected openUpdateAnnouncementDialog(announcementId:number){
    const dialogRef =  this.dialog.open(UpdateAnnouncementDialogComponent,{
      maxWidth: '100vh',
      width: '500%',
      panelClass: 'update-announcement-dialog',
      data: announcementId
    });

    dialogRef.afterClosed().subscribe(()=>{
      this.clearFilters();
    })
  }

  protected override mapFormToFilter(formValues: Record<string, any>): AnnouncementFilterRequest {
    return {
      courseId: undefined,
      batchId: undefined,
      status: formValues['status'] || undefined,
      visibility: formValues['visibility'] || undefined
    };
  }

  protected readonly Eye = Eye;
  protected readonly Edit = Edit;
  protected readonly AnnouncementStatus = AnnouncementStatus;
  protected readonly AnnouncementVisibility = AnnouncementVisibility;
  protected readonly ArrowUpDown = ArrowUpDown;
}
