import {Component, inject, input} from '@angular/core';
import {Edit, LucideAngularModule} from 'lucide-angular';
import {ModuleDetailedResponse} from '../../dtos/response/ModuleDetailedResponse';
import {MatDialog} from '@angular/material/dialog';
import {AlertService} from '@core/services/alerts/alert.service';
import {
  ModuleUptTeacherComponent,
  ModuleUptTeacherDialogData
} from '../../dialogs/module-upt-teacher/module-upt-teacher.component';
import {ModuleService} from '../../services/module/module.service';
import {CardHeaderComponent, CardShellComponent, InfoRowComponent} from '@shared/ui';

@Component({
  selector: 'app-module-teacher-panel',
  imports: [
    CardShellComponent,
    CardHeaderComponent,
    LucideAngularModule,
    InfoRowComponent
  ],
  templateUrl: './module-teacher-panel.component.html',
  styleUrl: './module-teacher-panel.component.css'
})
export class ModuleTeacherPanelComponent {

  module = input.required<ModuleDetailedResponse>();

  private readonly dialog:MatDialog = inject(MatDialog);
  private readonly alertService:AlertService = inject(AlertService);
  private readonly moduleService:ModuleService = inject(ModuleService);

  protected openUpdateModuleTeacherDialog():void{
    const dialogData:ModuleUptTeacherDialogData={
      moduleId: this.module().id,
      currentTeacherId: this.module().teacher.id,
      currentTeacherName: this.module().teacher.firstName+" "+this.module().teacher.lastName
    }
    const dialogRef = this.dialog.open(ModuleUptTeacherComponent,{
      width: ' 450px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe({
      next: (res)=>{
        if(res){
          this.fetchModuleDetails();
        }
      },
      error: (err) =>{
        this.alertService.triggerErrorAlert(err.error.message);
      }
    });
  }

  private fetchModuleDetails():void{
    this.moduleService.getDetailedModuleById(this.module().id).subscribe({
      next: (res)=>{
        if(res.data){
          this.module().teacher = res.data.teacher;
        }
      },
      error: (err)=>{
        this.alertService.triggerErrorAlert(err.error.message);
      }
    })
  }

  protected readonly Edit = Edit;
}
