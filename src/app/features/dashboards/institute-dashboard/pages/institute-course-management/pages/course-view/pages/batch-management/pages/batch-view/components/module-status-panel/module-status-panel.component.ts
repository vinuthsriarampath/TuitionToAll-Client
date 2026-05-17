import {Component, inject, input} from '@angular/core';
import {CardShellComponent} from '../../../../../../../../../../../../../shared/ui/card-shell/card-shell.component';
import {CardHeaderComponent} from '../../../../../../../../../../../../../shared/ui/card-header/card-header.component';
import {
  ModuleDetailedResponse
} from '../../../../../../../../../../../../../core/dto/response-dto/module/ModuleDetailedResponse';
import {ModuleStatus} from '../../../../../../../../../../../../../core/enums/ModuleStatus';
import {Archive, LucideAngularModule, UploadCloud} from 'lucide-angular';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AlertService} from '../../../../../../../../../../../../../core/services/alerts/alert.service';
import {ModuleService} from '../../../../../../../../../../../../../core/services/module/module.service';
import {
  ConfirmationDialogComponent,
  ConfirmationDialogData
} from '../../../../../../../../../announcements-management/model/update-announcement-dialog/models/confirmation-dialog/confirmation-dialog.component';
import {ModuleBadgeComponent} from '../module-badge/module-badge.component';

@Component({
  selector: 'app-module-status-panel',
  imports: [
    CardShellComponent,
    CardHeaderComponent,
    LucideAngularModule,
    ModuleBadgeComponent
  ],
  templateUrl: './module-status-panel.component.html',
  styleUrl: './module-status-panel.component.css'
})
export class ModuleStatusPanelComponent {
  module = input.required<ModuleDetailedResponse>();

  private readonly dialog:MatDialog = inject(MatDialog);
  private readonly alertService:AlertService = inject(AlertService);
  private readonly moduleService:ModuleService = inject(ModuleService);

  private openConfirmationDialog(confirmationDialogData:ConfirmationDialogData):MatDialogRef<ConfirmationDialogComponent>{
    return this.dialog.open(ConfirmationDialogComponent,{
      data:confirmationDialogData,
      width: '450px',
      disableClose: true,
    });
  }

  protected openPublishModuleDialog():void{
    const confirmationData:ConfirmationDialogData = {
      title: 'Publish module',
      confirmText: 'Publish',
      message: 'Please Confirm this action, once published module is visible to all related teachers and students',
      icon: UploadCloud,
      type: "success",
      confirmButtonClass: 'btn-mini-primary btn-success'
    }

    const dialogRef = this.openConfirmationDialog(confirmationData);

    dialogRef.afterClosed().subscribe({
      next:(res)=>{
        if(res){
          this.moduleService.publishModule(this.module().id).subscribe({
            next: (res) => {
              if(res.data){
                this.alertService.triggerSuccessAlert("Module Published Successfully");
                this.module().status = res.data.status;
              }
            },
            error: (err) => {
              this.alertService.triggerErrorAlert(err.error.message);
            }
          });
        }
      }
    })

  }

  protected openArchiveModuleDialog():void{
    const confirmationData:ConfirmationDialogData = {
      title: 'Archive module',
      confirmText: 'Archive',
      message: 'Please Confirm this action, once Archived module is not visible to all related teachers and students',
      icon: Archive,
      type: "danger",
      confirmButtonClass: 'btn-mini-primary btn-danger'
    }

    const dialogRef = this.openConfirmationDialog(confirmationData);

    dialogRef.afterClosed().subscribe({
      next:(res)=>{
        if(res){
          this.moduleService.archiveModule(this.module().id).subscribe({
            next: (res) => {
              if(res.data){
                this.alertService.triggerSuccessAlert("Module Archived Successfully!");
                this.module().status = res.data.status;
              }
            },
            error: (err) => {
              this.alertService.triggerErrorAlert(err.error.message);
            }
          });
        }
      }
    })
  }

  protected readonly ModuleStatus = ModuleStatus;
  protected readonly UploadCloud = UploadCloud;
  protected readonly Archive = Archive;
}
