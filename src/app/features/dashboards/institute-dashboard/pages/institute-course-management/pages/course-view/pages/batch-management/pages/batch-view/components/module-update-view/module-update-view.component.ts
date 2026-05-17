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

@Component({
  selector: 'app-module-update-view',
  imports: [
    DialogLayoutComponent,
    ModuleDangerPanelComponent,
    ModuleNamePanelComponent,
    ModuleBatchPanelComponent,
  ],
  templateUrl: './module-update-view.component.html',
  styleUrl: './module-update-view.component.css'
})
export class ModuleUpdateViewComponent {

  protected loading:boolean = false;
  protected module!:ModuleDetailedResponse;
  private readonly dialogRef:MatDialogRef<ModuleUpdateViewComponent> = inject(MatDialogRef<ModuleUpdateViewComponent>);

  constructor(@Inject(MAT_DIALOG_DATA) private readonly data:ModuleDetailedResponse) {
    this.module = data;
  }

  protected close():void{
    this.dialogRef.close();
  }

  protected triggerLoading():void{
    this.loading = !this.loading;
  }
  protected readonly Book = Book;
}
