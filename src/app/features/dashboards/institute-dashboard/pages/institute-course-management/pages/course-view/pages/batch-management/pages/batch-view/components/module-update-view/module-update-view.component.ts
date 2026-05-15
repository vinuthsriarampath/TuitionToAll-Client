import {Component, Inject, inject} from '@angular/core';
import {
  DialogLayoutComponent
} from '../../../../../../../../../../../../../core/layouts/dialog-layout/dialog-layout.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ModuleResponse} from '../../../../../../../../../../../../../core/dto/response-dto/module/ModuleResponse';
import {Book} from 'lucide-angular';

@Component({
  selector: 'app-module-update-view',
  imports: [
    DialogLayoutComponent
  ],
  templateUrl: './module-update-view.component.html',
  styleUrl: './module-update-view.component.css'
})
export class ModuleUpdateViewComponent {


  protected module!:ModuleResponse;
  private readonly dialogRef:MatDialogRef<ModuleUpdateViewComponent> = inject(MatDialogRef<ModuleUpdateViewComponent>);

  constructor(@Inject(MAT_DIALOG_DATA) private readonly data:ModuleResponse) {
    this.module = data;
  }

  protected close():void{
    this.dialogRef.close();
  }

  protected readonly Book = Book;
}
