import {Component, input} from '@angular/core';
import {CardShellComponent} from '../../../../../../../../../../../../../shared/ui/card-shell/card-shell.component';
import {CardHeaderComponent} from '../../../../../../../../../../../../../shared/ui/card-header/card-header.component';
import {
  ModuleDetailedResponse
} from '../../../../../../../../../../../../../core/dto/response-dto/module/ModuleDetailedResponse';
import {Edit, LucideAngularModule} from 'lucide-angular';
import {InfoRowComponent} from '../../../../../../../../../../../../../shared/ui/info-row/info-row.component';

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

  protected openUpdateModuleBatchDialog():void{

  }

  protected readonly Edit = Edit;
}
