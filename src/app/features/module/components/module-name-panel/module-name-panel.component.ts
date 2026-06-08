import {Component, inject, input} from '@angular/core';
import {CardShellComponent} from '../../../../shared/ui/card-shell/card-shell.component';
import {CardHeaderComponent} from '../../../../shared/ui/card-header/card-header.component';
import {Edit, LucideAngularModule} from 'lucide-angular';
import {ModuleDetailedResponse} from '../../dtos/response/ModuleDetailedResponse';
import {InfoRowComponent} from '../../../../shared/ui/info-row/info-row.component';
import {MatDialog} from '@angular/material/dialog';
import {
  ModuleUptNameDialogComponent,
  ModuleUptNameDialogData
} from '../../dialogs/module-upt-name-dialog/module-upt-name-dialog.component';
import {AlertService} from '../../../../core/services/alerts/alert.service';

@Component({
  selector: 'app-module-name-panel',
  imports: [
    CardShellComponent,
    CardHeaderComponent,
    LucideAngularModule,
    InfoRowComponent
  ],
  templateUrl: './module-name-panel.component.html',
  styleUrl: './module-name-panel.component.css'
})
export class ModuleNamePanelComponent {

  module = input.required<ModuleDetailedResponse>();

  private readonly dialog:MatDialog = inject(MatDialog);
  private readonly alertService:AlertService = inject(AlertService);

  protected openUpdateModuleDialog():void{

    const dialogData:ModuleUptNameDialogData ={
      moduleId:this.module().id,
      currentName:this.module().name
    }

    const dialogRef = this.dialog.open(ModuleUptNameDialogComponent,{
      width: '450px',
      data:dialogData,
    });

    dialogRef.afterClosed().subscribe({
      next:(newName)=>{
        if(newName){
          this.module().name = newName;
        }
      },
      error:(err)=>{
        this.alertService.triggerErrorAlert(err.error.message);
      }
    })
  }

  protected readonly Edit = Edit;
}
