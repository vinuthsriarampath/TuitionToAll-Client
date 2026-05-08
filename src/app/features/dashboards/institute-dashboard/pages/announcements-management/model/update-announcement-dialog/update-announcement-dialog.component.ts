import {Component, Inject, inject} from '@angular/core';
import {
  Archive,
  BookOpen,
  CalendarClock,
  Eye,
  LucideAngularModule,
  Megaphone,
  Pin,
  PinOff,
  Send,
  SquarePen,
  Trash2,
  Users
} from 'lucide-angular';
import {AnnouncementResponse} from '../../../../../../../core/dto/response-dto/AnnouncementResponse';
import {AnnouncementStatus} from '../../../../../../../core/enums/AnnouncementStatus';
import {AnnouncementVisibility} from '../../../../../../../core/enums/AnnouncementVisibility';
import {DatePipe, NgClass} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AnnouncementService} from '../../../../../../../core/services/announcements/announcement.service';
import {AlertService} from '../../../../../../../core/services/alerts/alert.service';
import {QuillEditorComponent} from 'ngx-quill';
import {FormsModule} from '@angular/forms';
import {
  ConfirmationDialogComponent,
  ConfirmationDialogData
} from './models/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-update-announcement-dialog',
  imports: [
    LucideAngularModule,
    NgClass,
    DatePipe,
    QuillEditorComponent,
    FormsModule
  ],
  templateUrl: './update-announcement-dialog.component.html',
  styleUrl: './update-announcement-dialog.component.css'
})
export class UpdateAnnouncementDialogComponent {

  protected loading: boolean = false;
  protected announcement!:AnnouncementResponse;

  private readonly dialog:MatDialog = inject(MatDialog);
  private readonly dialogRef:MatDialogRef<UpdateAnnouncementDialogComponent> = inject(MatDialogRef<UpdateAnnouncementDialogComponent>);
  private readonly announcementService:AnnouncementService = inject(AnnouncementService);
  private readonly alertService:AlertService = inject(AlertService);

  constructor(@Inject(MAT_DIALOG_DATA) private readonly data:number) {
    this.fetchAnnouncementById(data);
  }

  fetchAnnouncementById(id:number){
    this.announcementService.getAnnouncementById(id).subscribe({
      next: (res)=>{
        if(res.data){
          this.announcement = res.data;
        }
      },
      error: (err)=>{
        this.alertService.triggerErrorAlert(err.error.message)
      }
    })
  }
  onCancel() {
      this.dialogRef.close();
  }
  openContentUpdate() {
      throw new Error("Method not implemented.");
  }
  protected publishAnnouncement() {
    const confirmationData:ConfirmationDialogData = {
      title: 'Publish Announcement',
      message: 'This announcement will become visible to users.',
      confirmText: 'Publish',
      confirmButtonClass: 'btn-mini-primary btn-success',
      type: 'success',
      icon: Send
    }

    const dialogRef = this.triggerConfirmation(confirmationData);

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {

      if (confirmed) {
        this.triggerLoading();
        this.announcementService.archiveAnnouncement(this.announcement.id).subscribe({
          next: (res) =>{
            if(res.data){
              this.triggerLoading();
              this.announcement = res.data;
              this.alertService.triggerSuccessAlert('Announcement Published successfully');
            }
          },
          error: (err) => {
            this.triggerLoading();
            this.alertService.triggerErrorAlert(err.error.message);
          }
        })
      }

    });
  }
  archiveAnnouncement() {
    const confirmationData:ConfirmationDialogData = {
      title: 'Archive Announcement',
      message: 'Archived announcements will no longer be editable.',
      confirmText: 'Archive',
      confirmButtonClass: 'btn-mini-secondary',
      type: 'warning',
      icon: Archive
    }

    const dialogRef = this.triggerConfirmation(confirmationData);

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {

      if (confirmed) {
        this.triggerLoading();
        this.announcementService.archiveAnnouncement(this.announcement.id).subscribe({
          next: (res) =>{
            if(res.data){
              this.triggerLoading();
              this.announcement = res.data;
              this.alertService.triggerSuccessAlert('Announcement Archived successfully');
            }
          },
          error: (err) => {
            this.triggerLoading();
            this.alertService.triggerErrorAlert(err.error.message);
          }
        })
      }

    });
  }
  protected pinAnnouncement() {
    const confirmationData:ConfirmationDialogData = {
      title: 'Pin Announcement',
      message: 'Pinned announcements appear at the top.',
      confirmText: 'Pin',
      confirmButtonClass: 'btn-mini-primary',
      type: 'info',
      icon: Pin
    }

    const dialogRef = this.triggerConfirmation(confirmationData);

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {

      if (confirmed) {
        this.triggerLoading();
        this.announcementService.pinAnnouncement(this.announcement.id).subscribe({
          next: (res) =>{
            if(res.data){
              this.triggerLoading();
              this.announcement = res.data;
              this.alertService.triggerSuccessAlert('Announcement Pinned successfully');
            }
          },
          error: (err) => {
            this.triggerLoading();
            this.alertService.triggerErrorAlert(err.error.message);
          }
        })
      }

    });
  }
  unpinAnnouncement() {
    const confirmationData:ConfirmationDialogData = {
      title: 'Unpin Announcement',
      message: 'This announcement will no longer stay highlighted.',
      confirmText: 'Unpin',
      confirmButtonClass: 'btn-mini-primary',
      type: 'warning',
      icon: PinOff
    }

    const dialogRef = this.triggerConfirmation(confirmationData);

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {

      if (confirmed) {
        this.triggerLoading();
        this.announcementService.unpinAnnouncement(this.announcement.id).subscribe({
          next: (res) =>{
            if(res.data){
              this.triggerLoading();
              this.announcement = res.data;
              this.alertService.triggerSuccessAlert('Announcement Unpinned successfully');
            }
          },
          error: (err) => {
            this.triggerLoading();
            this.alertService.triggerErrorAlert(err.error.message);
          }
        })
      }

    });
  }

  deleteAnnouncement() {

    const confirmationData:ConfirmationDialogData = {
      title: 'Delete Announcement',
      message: 'This action cannot be undone. The announcement will be permanently deleted.',
      confirmText: 'Delete',
      confirmButtonClass: 'btn-mini-primary btn-danger',
      type: 'danger',
      icon: Trash2
    }

    const dialogRef = this.triggerConfirmation(confirmationData);

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {

      if (confirmed) {
        this.triggerLoading();
        this.announcementService.deleteAnnouncement(this.announcement.id).subscribe({
          next: (res) =>{
            if(res.data){
              this.triggerLoading();
              this.announcement = res.data;
              this.alertService.triggerSuccessAlert('Announcement deleted successfully');
            }
          },
          error: (err) => {
            this.triggerLoading();
            this.alertService.triggerErrorAlert(err.error.message);
          }
        })
      }

    });
  }
  protected openVisibilityUpdate() {
    throw new Error("Method not implemented.");
  }

  private triggerConfirmation(confirmationData:ConfirmationDialogData):MatDialogRef<ConfirmationDialogComponent>{
    return  this.dialog.open(ConfirmationDialogComponent, {
      width: '450px',
      disableClose: true,
      data: confirmationData
    });
  }

  protected triggerLoading():void{
    this.loading = !this.loading;
  }


  protected readonly Trash2 = Trash2;
  protected readonly PinOff = PinOff;
  protected readonly Pin = Pin;
  protected readonly Archive = Archive;
  protected readonly AnnouncementStatus = AnnouncementStatus;
  protected readonly Send = Send;
  protected readonly AnnouncementVisibility = AnnouncementVisibility;
  protected readonly Eye = Eye;
  protected readonly SquarePen = SquarePen;
  protected readonly CalendarClock = CalendarClock;
  protected readonly Users = Users;
  protected readonly BookOpen = BookOpen;
  protected readonly Megaphone = Megaphone;
}
