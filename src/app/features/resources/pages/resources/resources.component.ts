import {Component, inject, OnInit} from '@angular/core';
import {CardShellComponent} from '@shared/ui';
import {ChapterService} from '../../../chapter/services/chapter/chapter.service';
import {AlertService} from '@core/services/alerts/alert.service';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatNoDataRow,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {ResourceResponse} from '../../dtos/response/ResourceResponse';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {Download, LucideAngularModule, RefreshCw, Trash2} from 'lucide-angular';
import {ResourceService} from '../../services/resource/resource.service';
import {environment} from '@env/environment.development';
import {ResourceCreateComponent} from '../../dialogs/resource-create/resource-create.component';
import {ConfirmationDialogData} from '@shared/dialogs/confirmation-dialog/confirmation-dialog.component';
import {NoContentComponent} from '@shared/components/no-content/no-content.component';

@Component({
  selector: 'app-resources',
  imports: [
    CardShellComponent,
    MatTable,
    MatColumnDef,
    MatCell,
    MatCellDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRowDef,
    MatRow,
    MatPaginator,
    LucideAngularModule,
    MatNoDataRow,
    NoContentComponent,
  ],
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.css'
})
export class ResourcesComponent implements OnInit{

  protected loading:boolean = false;

  protected dataSource:MatTableDataSource<ResourceResponse> = new MatTableDataSource<ResourceResponse>([]);
  protected columns:string[] = ['name','action'];

  protected totalElements = 0;
  protected pageSize = 5;
  protected pageIndex = 0;

  private chapterId!:number;

  private readonly chapterService:ChapterService = inject(ChapterService);
  private readonly alertService:AlertService = inject(AlertService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly resourceService:ResourceService = inject(ResourceService);
  private readonly dialog:MatDialog = inject(MatDialog);

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params)=>{
      const chapterIdParam = params.get('chapterId') ?? '';
      const parsedChapterId = Number.parseInt(chapterIdParam);
      if(Number.isNaN(parsedChapterId)){
        this.alertService.triggerErrorAlert("Invalid chapter id passed via route parameters");
      }
      this.chapterId = parsedChapterId;
      this.fetchResources();
    })
  }

  protected onRefresh(){
    this.fetchResources();
  }

  private fetchResources():void{
    this.triggerLoading();
    this.chapterService.getAllResourcesWithFilters(this.chapterId,this.pageIndex,this.pageSize).subscribe({
      next:(res)=>{
        if(res.data){
          this.dataSource.data = res.data ?? [];
          this.pageIndex = res.page ?? 0;
          this.pageSize = res.size ?? 5;
          this.totalElements = res.totalElements ?? 0;
          this.triggerLoading();
        }
      },
      error:(err)=>{
        this.alertService.triggerErrorAlert(err.error.message);
        this.triggerLoading();
      }
    })
  }

  protected onPageChange($event: PageEvent) {
    this.pageIndex = $event.pageIndex;
    this.pageSize = $event.pageSize;
    this.fetchResources();
  }

  onDownload(fileName: string): void {
    const url = `${this.environment.RESOURCE_API}/download/${fileName}`;
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
  }

  protected openResourceCreateDialog(): void {
    const dialogRef = this.dialog.open(ResourceCreateComponent,{
      data: this.chapterId,
      width: '650px',
      disableClose: false
    })

    dialogRef.afterClosed().subscribe({
      next:(res)=>{
        if(res) this.fetchResources();
      },
      error:(err)=>{
        this.alertService.triggerErrorAlert(err.error.message);
      }
    });
  }

  protected onDeleteConfirmation(resourceId: string): void {
    const dialogData:ConfirmationDialogData = {
      title: "Confirm Deletion",
      message: "Are you sure you want to delete this resource?",
      confirmText:"Delete",
      confirmButtonClass: "btn-mini-secondary btn-danger",
      cancelText: "Cancel",
      type: "danger",
      icon: Trash2
    }
    this.alertService.triggerSuccessConfirmationAlert(dialogData).subscribe({
      next:(res)=>{
        if (res){
          this.onDelete(Number.parseInt(resourceId));
        }
      }
    })

  }

  private onDelete(resourceId: number): void {
    this.resourceService.deleteResource(resourceId).subscribe({
      next: (res) => {
        if(res) {
          this.alertService.triggerSuccessAlert("Resource deleted successfully");
          this.fetchResources();
        }
      },
      error:(err)=>{
        this.alertService.triggerErrorAlert(err.error.message);
      }
    });
  }

  private triggerLoading():void{
    this.loading = !this.loading;
  }

  protected readonly Download = Download;
  protected readonly RefreshCw = RefreshCw;
  protected readonly environment = environment;
  protected readonly Trash2 = Trash2;
}
