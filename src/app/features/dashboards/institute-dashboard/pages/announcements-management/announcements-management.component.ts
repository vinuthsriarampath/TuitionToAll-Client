import {Component, inject, OnInit} from '@angular/core';
import {PageTitleComponent} from '../../../../../shared/components/page-title/page-title.component';
import {AnnouncementService} from '../../../../../core/services/announcements/announcement.service';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {AnnouncementResponse} from '../../../../../core/dto/response-dto/AnnouncementResponse';
import {AlertService} from '../../../../../core/services/alerts/alert.service';
import {Edit, Eye, FileUser, LucideAngularModule} from 'lucide-angular';
import {MatTooltip} from '@angular/material/tooltip';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {
  CreateAnnouncementDialogComponent
} from './model/create-announcement-dialog/create-announcement-dialog.component';
import {NgClass} from '@angular/common';
import {AnnouncementStatus} from '../../../../../core/enums/AnnouncementStatus';
import {AnnouncementVisibility} from '../../../../../core/enums/AnnouncementVisibility';
import {
  UpdateAnnouncementDialogComponent
} from './model/update-announcement-dialog/update-announcement-dialog.component';

@Component({
  selector: 'app-announcements-management',
  imports: [
    PageTitleComponent,
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
    NgClass
  ],
  templateUrl: './announcements-management.component.html',
  styleUrl: './announcements-management.component.css'
})
export class AnnouncementsManagementComponent implements OnInit {

  private readonly announcementService :AnnouncementService = inject(AnnouncementService);
  private readonly alertService:AlertService = inject(AlertService);
  private readonly dialog:MatDialog = inject(MatDialog);

  // table related variables
  protected readonly columns:string[] = ['id','title','visibility','status','createdDate','lastModifiedDate','actions'];
  protected dataSource = new MatTableDataSource<AnnouncementResponse>([]);

  // pagination related variables

  protected pageIndex = 0;
  protected pageSize = 10;
  protected totalElements = 0;

  ngOnInit(): void {
    this.loadAnnouncements();
  }

  loadAnnouncements(){
    this.announcementService.getAllAnnouncements(this.pageIndex,this.pageSize).subscribe({
      next: (res) => {
        if (res){
          this.dataSource.data = res.data ?? [];
          this.pageIndex =  res.page ?? 0;
          this.pageSize = res.size ?? 10;
          this.totalElements = res.totalElements ?? 0;
        }
      },
      error: (err) => {
        this.alertService.triggerErrorAlert(err.error.message);
      }
    })
  }

  protected onPageChange(event:PageEvent){
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadAnnouncements();
  }

  protected openCreateAnnouncementDialog(){
    const dialogRef =  this.dialog.open(CreateAnnouncementDialogComponent,{
      maxWidth: '100vh',
      width: '500%',
      panelClass: 'create-announcement-dialog'
    });

    dialogRef.afterClosed().subscribe(()=>{
      this.loadAnnouncements();
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
      this.loadAnnouncements();
    })
  }

  protected readonly Eye = Eye;
  protected readonly Edit = Edit;
  protected readonly AnnouncementStatus = AnnouncementStatus;
  protected readonly AnnouncementVisibility = AnnouncementVisibility;
}
