import {Component, input} from '@angular/core';
import {CardShellComponent} from '../../../../../../../../../../../../../shared/ui/card-shell/card-shell.component';
import {CardHeaderComponent} from '../../../../../../../../../../../../../shared/ui/card-header/card-header.component';
import {Edit, LucideAngularModule} from 'lucide-angular';
import {InfoRowComponent} from '../../../../../../../../../../../../../shared/ui/info-row/info-row.component';
import {
  ModuleDetailedResponse
} from '../../../../../../../../../../../../../core/dto/response-dto/module/ModuleDetailedResponse';

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

  protected openUpdateModuleTeacherDialog():void{
    throw new Error('Method not implemented yet');
  }

  protected readonly Edit = Edit;
}
