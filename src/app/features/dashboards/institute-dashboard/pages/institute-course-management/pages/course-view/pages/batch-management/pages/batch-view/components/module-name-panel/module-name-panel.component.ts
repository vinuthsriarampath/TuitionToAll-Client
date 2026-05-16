import {Component, input} from '@angular/core';
import {CardShellComponent} from '../../../../../../../../../../../../../shared/ui/card-shell/card-shell.component';
import {CardHeaderComponent} from '../../../../../../../../../../../../../shared/ui/card-header/card-header.component';
import {Edit, LucideAngularModule} from 'lucide-angular';
import {
  ModuleDetailedResponse
} from '../../../../../../../../../../../../../core/dto/response-dto/module/ModuleDetailedResponse';
import {InfoRowComponent} from '../../../../../../../../../../../../../shared/ui/info-row/info-row.component';

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

  protected openUpdateModuleDialog():void{

  }

  protected readonly Edit = Edit;
}
