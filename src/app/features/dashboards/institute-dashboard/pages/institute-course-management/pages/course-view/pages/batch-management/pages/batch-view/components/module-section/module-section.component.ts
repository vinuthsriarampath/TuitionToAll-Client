import {Component, inject, input, OnInit} from '@angular/core';
import {
  PageLayoutComponent
} from '../../../../../../../../../../../../../core/layouts/page-layout/page-layout.component';
import {Edit, Eye, LucideAngularModule, Plus, View} from 'lucide-angular';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {BatchService} from '../../../../../../../../../../../../../core/services/batch/batch.service';
import {ModuleResponse} from '../../../../../../../../../../../../../core/dto/response-dto/module/ModuleResponse';
import {AlertService} from '../../../../../../../../../../../../../core/services/alerts/alert.service';
import {ModuleBadgeComponent} from '../module-badge/module-badge.component';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {DatePipe} from '@angular/common';
import {MatTooltip} from '@angular/material/tooltip';
import {MatDialog} from '@angular/material/dialog';
import {CreateModuleDialogComponent} from '../create-module-dialog/create-module-dialog.component';

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
    MatTooltip
  ],
  templateUrl: './module-section.component.html',
  styleUrl: './module-section.component.css'
})
export class ModuleSectionComponent implements OnInit {

  batchId = input.required<number>();

  //table related variables
  protected pageIndex:number = 0;
  protected pageSize:number = 10;
  protected totalElements:number = 0;

  protected columns:string[] = ['id', 'name', 'status', 'createdDate','lastModifiedDate','actions'];
  protected dataSource:MatTableDataSource<ModuleResponse> = new MatTableDataSource<ModuleResponse>([]);

  //dependencies
  private readonly batchService:BatchService = inject(BatchService);
  private readonly alertService:AlertService = inject(AlertService);
  private readonly dialog:MatDialog = inject(MatDialog);


  ngOnInit(): void {
    this.loadModulesByBatch();
  }

  protected loadModulesByBatch():void{
    this.batchService.getAllModulesByBatch(this.batchId()).subscribe({
        next:(res)=>{
          if(res.data){
            this.dataSource.data = res.data;
            this.pageIndex = res.page ?? 0;
            this.pageSize =res.size ?? 10;
            this.totalElements = res.totalElements ?? 0;
          }
        },
      error:(err)=>{
          this.alertService.triggerErrorAlert(err.error.message);
      }
    });
  }

  protected openCreateModuleDialog():void{
    const dialogRef = this.dialog.open(CreateModuleDialogComponent,{
      width: '600px',
      data: this.batchId(),
    });

    dialogRef.afterClosed().subscribe({
      next:() => {
        this.loadModulesByBatch();
      },
      error: (err) => {
        this.alertService.triggerErrorAlert(err.error.message);
      }
    })
  }

  protected onPageChange(event : PageEvent):void{
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadModulesByBatch();
  }

  protected readonly Plus = Plus;
  protected readonly View = View;
  protected readonly Edit = Edit;
  protected readonly Eye = Eye;
}
