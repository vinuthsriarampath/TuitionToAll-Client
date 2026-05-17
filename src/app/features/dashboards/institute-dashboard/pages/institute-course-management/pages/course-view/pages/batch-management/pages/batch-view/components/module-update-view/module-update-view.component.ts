import {Component, Inject, inject} from '@angular/core';
import {
  DialogLayoutComponent
} from '../../../../../../../../../../../../../core/layouts/dialog-layout/dialog-layout.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Book} from 'lucide-angular';
import {
  ModuleDetailedResponse
} from '../../../../../../../../../../../../../core/dto/response-dto/module/ModuleDetailedResponse';
import {ModuleDangerPanelComponent} from '../module-danger-panel/module-danger-panel.component';
import {ModuleNamePanelComponent} from '../module-name-panel/module-name-panel.component';
import {ModuleBatchPanelComponent} from '../module-batch-panel/module-batch-panel.component';
import {ModuleTeacherPanelComponent} from '../module-teacher-panel/module-teacher-panel.component';
import {ModuleStatusPanelComponent} from '../module-status-panel/module-status-panel.component';
import {ModuleService} from '../../../../../../../../../../../../../core/services/module/module.service';
import {AlertService} from '../../../../../../../../../../../../../core/services/alerts/alert.service';

@Component({
  selector: 'app-module-update-view',
  imports: [
    DialogLayoutComponent,
    ModuleDangerPanelComponent,
    ModuleNamePanelComponent,
    ModuleBatchPanelComponent,
    ModuleTeacherPanelComponent,
    ModuleStatusPanelComponent,
  ],
  templateUrl: './module-update-view.component.html',
  styleUrl: './module-update-view.component.css'
})
export class ModuleUpdateViewComponent {

  private readonly moduleId!:number;

  protected loading:boolean = false;
  protected module!:ModuleDetailedResponse;
  private readonly dialogRef:MatDialogRef<ModuleUpdateViewComponent> = inject(MatDialogRef<ModuleUpdateViewComponent>);
  private readonly moduleService:ModuleService = inject(ModuleService);
  private readonly alertService:AlertService = inject(AlertService);

  constructor(@Inject(MAT_DIALOG_DATA) private readonly data:number) {
    this.moduleId = data;
    this.fetchModuleDetails(this.moduleId);
  }

  private fetchModuleDetails(moduleId:number):void{
    if (!moduleId) {
      this.alertService.triggerErrorAlert("Module ID is invalid!");
      return;
    }
    this.moduleService.getDetailedModuleById(moduleId).subscribe({
      next: (res)=>{
        if(res.data){
          this.module = res.data;
        }
      },
      error: (err)=>{
        this.alertService.triggerErrorAlert(err.error.message);
      }
    })
  }

  protected close():void{
    this.dialogRef.close();
  }

  protected triggerLoading():void{
    this.loading = !this.loading;
  }
  protected readonly Book = Book;
}
