import {Component, inject, input, output} from '@angular/core';
import {CardHeaderComponent} from "../../../../shared/ui/card-header/card-header.component";
import {Lock, LucideAngularModule} from "lucide-angular";
import {
  ModuleDetailedResponse
} from '../../dtos/response/ModuleDetailedResponse';
import {MatDialog} from '@angular/material/dialog';
import {ModuleService} from '../../services/module/module.service';
import {AlertService} from '../../../../core/services/alerts/alert.service';
import {
  ConfirmationDialogComponent,
  ConfirmationDialogData
} from '../../../announcement/dialogs/confirmation-dialog/confirmation-dialog.component';
import {ModuleStatus} from '../../enums/ModuleStatus';

@Component({
  selector: 'app-module-danger-panel',
    imports: [
        CardHeaderComponent,
        LucideAngularModule
    ],
  templateUrl: './module-danger-panel.component.html',
  styleUrl: './module-danger-panel.component.css'
})
export class ModuleDangerPanelComponent {
  module = input.required<ModuleDetailedResponse>();
  triggerLoading = output<void>();

  private readonly dialog:MatDialog = inject(MatDialog);
  private readonly moduleService:ModuleService = inject(ModuleService);
  private readonly alertService:AlertService = inject(AlertService);

  protected lockModule():void{

    const confirmationData:ConfirmationDialogData = {
      title: 'Lock module',
      message: 'The module will be locked for public access.',
      confirmText: 'Lock',
      confirmButtonClass: 'btn-mini-primary btn-danger',
      type: 'danger',
      icon: Lock
    }

    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      width: '450px',
      disableClose: true,
      data: confirmationData
    });

    dialogRef.afterClosed().subscribe((confirmed:boolean)=>{
      if (confirmed) {
        this.triggerLoading.emit();
        this.moduleService.lockModule(this.module().id).subscribe({
          next: (res) => {
            if (res.data) {
              this.triggerLoading.emit();
              this.module().status = ModuleStatus.LOCKED;
            }
          },
          error: (err) => {
            this.triggerLoading.emit();
            this.alertService.triggerErrorAlert(err.error.message);
          }
        });
      }
    })
  }

  protected readonly Lock = Lock;
  protected readonly ModuleStatus = ModuleStatus;
}
