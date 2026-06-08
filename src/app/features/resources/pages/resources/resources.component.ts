import {Component, inject, OnInit} from '@angular/core';
import {CardShellComponent} from '../../../../shared/ui/card-shell/card-shell.component';
import {ChapterService} from '../../../../core/services/chapter/chapter.service';
import {AlertService} from '../../../../core/services/alerts/alert.service';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {ResourceResponse} from '../../dtos/response/ResourceResponse';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {Download, LucideAngularModule, Pencil, RefreshCw} from 'lucide-angular';
import {ResourceService} from '../../services/resource/resource.service';
import {environment} from '../../../../environment/environment.development';
import {ResourceCreateComponent} from '../../dialogs/resource-create/resource-create.component';

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
  ],
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.css'
})
export class ResourcesComponent implements OnInit{

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
    this.chapterService.getAllResourcesWithFilters(this.chapterId,this.pageIndex,this.pageSize).subscribe({
      next:(res)=>{
        if(res.data){
          this.dataSource.data = res.data ?? [];
          this.pageIndex = res.page ?? 0;
          this.pageSize = res.size ?? 5;
          this.totalElements = res.totalElements ?? 0;
        }
      },
      error:(err)=>{
        this.alertService.triggerErrorAlert(err.error.message);
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

  protected readonly Download = Download;
  protected readonly RefreshCw = RefreshCw;


  protected readonly environment = environment;
  protected readonly Pencil = Pencil;
}
