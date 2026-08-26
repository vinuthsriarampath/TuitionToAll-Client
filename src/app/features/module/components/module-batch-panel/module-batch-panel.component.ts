import {Component, inject, input} from '@angular/core';
import {ModuleDetailedResponse} from '../../dtos/response/ModuleDetailedResponse';
import {Edit, LucideAngularModule} from 'lucide-angular';
import {MatDialog} from '@angular/material/dialog';
import {AlertService} from '@core/services/alerts/alert.service';
import {ModuleService} from '../../services/module/module.service';
import {
  ModuleUptBatchComponent,
  ModuleUptBatchDialogData
} from '../../dialogs/module-upt-batch/module-upt-batch.component';
import {CardHeaderComponent, CardShellComponent, InfoRowComponent} from '@shared/ui';

@Component({
  selector: 'app-module-batch-panel',
  imports: [
    CardShellComponent,
    CardHeaderComponent,
    LucideAngularModule,
    InfoRowComponent
  ],
  templateUrl: './module-batch-panel.component.html',
  styleUrl: './module-batch-panel.component.css'
})
export class ModuleBatchPanelComponent {

  module = input.required<ModuleDetailedResponse>();

  private readonly dialog:MatDialog = inject(MatDialog);
  private readonly alertService:AlertService =inject(AlertService);
  private readonly moduleService:ModuleService = inject(ModuleService);

  protected openUpdateModuleBatchDialog():void{
    const dialogData:ModuleUptBatchDialogData = {
      moduleId:this.module().id,
      currentCourseId:this.module().batch.courseId,
      currentBatchId:this.module().batch.id,
      currentBatchName:this.module().batch.name
    }
    const dialogRef = this.dialog.open(ModuleUptBatchComponent,{
      width:'450px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe({
      next:(res)=>{
        if(res){
         this.fetchModuleDetails()
        }
      },
      error:(err)=>{
        this.alertService.triggerErrorAlert(err.error.message);
      }
    })
  }

  private fetchModuleDetails():void{
    this.moduleService.getDetailedModuleById(this.module().id).subscribe({
      next: (res)=>{
        if(res.data){
          this.module().batch = res.data.batch;
        }
      },
      error: (err)=>{
        this.alertService.triggerErrorAlert(err.error.message);
      }
    })
  }

  protected readonly Edit = Edit;
}
