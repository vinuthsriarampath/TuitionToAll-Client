import {Component, inject, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Info, LucideAngularModule} from 'lucide-angular';

@Component({
  selector: 'app-information-alert',
  imports: [
    LucideAngularModule
  ],
  templateUrl: './information-alert.component.html',
  styleUrl: './information-alert.component.css'
})
export class InformationAlertComponent {

  protected readonly title!:string;
  protected readonly description!:string;

  private readonly dialogRef:MatDialogRef<InformationAlertComponent> = inject(MatDialogRef<InformationAlertComponent>)

  constructor(@Inject(MAT_DIALOG_DATA) private readonly data :{title:string, description:string}) {
    this.title = data.title;
    this.description = data.description;
  }

  onConfirm(){
    this.dialogRef.close();
  }

  protected readonly Info = Info;
}
