import {Component, inject, input} from '@angular/core';
import {PageLayoutComponent} from '@core/layouts';
import {ArrowUpDown, Edit, Eye, LucideAngularModule, Plus, View} from 'lucide-angular';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import {ModuleResponse} from '../../dtos/response/ModuleResponse';
import {ModuleBadgeComponent} from '../module-badge/module-badge.component';
import {MatPaginator} from '@angular/material/paginator';
import {DatePipe} from '@angular/common';
import {MatTooltip} from '@angular/material/tooltip';
import {MatDialog} from '@angular/material/dialog';
import {CreateModuleDialogComponent} from '../../dialogs/create-module-dialog/create-module-dialog.component';
import {RouterLink} from '@angular/router';
import {ModuleUpdateViewComponent} from '../../dialogs/module-update-view/module-update-view.component';
import {BatchService} from '@features/batch/services/batch/batch.service';
import {NoContentComponent} from '@shared/components/no-content/no-content.component';
import {NonNullableFormBuilder} from '@angular/forms';
import {ModuleStatus} from '@features/module/enums/ModuleStatus';
import {BasePaginatedFilterComponent} from '@shared/utils/base/BasePaginatedFilterComponent';
import {ModuleFilterRequest} from '@features/module/dtos/request/ModuleFilterRequest';
import {PaginationRequest} from '@shared/utils/requests/PaginationRequest';
import {Observable} from 'rxjs';
import {FilterFieldConfig} from '@shared/utils/config/filter-config';
import {FilterToolbarComponent} from '@shared/components/filter-toolbar/filter-toolbar.component';

@Component({
  selector: 'app-module-section',
  imports: [
    PageLayoutComponent,
    LucideAngularModule,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    ModuleBadgeComponent,
    MatPaginator,
    DatePipe,
    MatTooltip,
    RouterLink,
    NoContentComponent,
    MatNoDataRow,
    FilterToolbarComponent
  ],
  templateUrl: './module-section.component.html',
  styleUrl: './module-section.component.css'
})
export class ModuleSectionComponent extends BasePaginatedFilterComponent<ModuleResponse, ModuleFilterRequest>{

  batchId = input.required<number>();

  //dependencies
  private readonly batchService:BatchService = inject(BatchService);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly dialog:MatDialog = inject(MatDialog);

  protected filterForm = this.fb.group({
    name: [''],
    status: [undefined as ModuleStatus | undefined]
  })

  protected columns:string[] = ['id', 'name', 'status', 'createdDate','lastModifiedDate','actions'];
  protected sortByFields = ['created_date'];

  protected filterFields:FilterFieldConfig[] = [
    {key:'name', label:'Module Name', type:'text',placeholder: 'Search by module name',colSpan: 'lg:col-span-2'},
    {key:'status', label:'Module Status', type:'select', placeholder: 'All Status', colSpan: 'lg:col-span-2', options: Object.values(ModuleStatus).map(v => ({label:v,value:v}))}
  ]

  protected fetchApiData(pagination:PaginationRequest, filters: ModuleFilterRequest):Observable<any>{
    return this.batchService.getAllModulesByBatch(this.batchId(),pagination, filters);
  }

  protected override mapFormToFilter(formValues: Record<string, any>): ModuleFilterRequest {
    return {
      name: formValues['name'] || undefined ,
      status: formValues['status'] || undefined
    };
  }

  protected openCreateModuleDialog():void{
    const dialogRef = this.dialog.open(CreateModuleDialogComponent,{
      width: '600px',
      data: this.batchId(),
    });

    dialogRef.afterClosed().subscribe({
      next:() => {
        this.clearFilters();
      },
      error: (err) => {
        this.alertService.triggerErrorAlert(err.error.message);
      }
    })
  }

  protected openModuleUpdateViewDialog(moduleId:number):void{
    const dialogRef = this.dialog.open(ModuleUpdateViewComponent,{
      data : moduleId,
      maxWidth: '100vh'
    });

    dialogRef.afterClosed().subscribe({
      next:()=>{
        this.clearFilters();
      },
      error:() => {
        this.alertService.triggerErrorAlert("Failed to update module");
      }
    })
  }

  protected readonly Plus = Plus;
  protected readonly View = View;
  protected readonly Edit = Edit;
  protected readonly Eye = Eye;
  protected readonly ArrowUpDown = ArrowUpDown;
}
