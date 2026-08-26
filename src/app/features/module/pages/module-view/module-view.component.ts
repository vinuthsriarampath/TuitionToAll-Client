import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {ModuleService} from '../../services/module/module.service';
import {AlertService} from '@core/services/alerts/alert.service';
import {ModuleDetailedResponse} from '../../dtos/response/ModuleDetailedResponse';
import {DatePipe, NgOptimizedImage} from '@angular/common';
import {ModuleBadgeComponent} from '../../components/module-badge/module-badge.component';
import {MatTooltip} from '@angular/material/tooltip';
import {ArrowLeft, Edit, LucideAngularModule, Pen, Plus} from 'lucide-angular';
import {MatDialog} from '@angular/material/dialog';
import {ModuleUpdateViewComponent} from '../../dialogs/module-update-view/module-update-view.component';
import {ChapterListComponent} from '../../../chapter/components/chapter-list/chapter-list.component';
import {
  ChapterCreateDialogComponent
} from '../../../chapter/dialogs/chapter-create-dialog/chapter-create-dialog.component';
import {MatTab, MatTabContent, MatTabGroup} from '@angular/material/tabs';
import {AssignmentListComponent} from '@features/assignments/pages/assignment-list/assignment-list.component';
import {PageLayoutComponent} from '@core/layouts';

@Component({
  selector: 'app-module-view',
  imports: [
    DatePipe,
    ModuleBadgeComponent,
    MatTooltip,
    LucideAngularModule,
    NgOptimizedImage,
    RouterLink,
    ChapterListComponent,
    MatTabGroup,
    MatTab,
    MatTabContent,
    AssignmentListComponent,
    PageLayoutComponent
  ],
  templateUrl: './module-view.component.html',
  styleUrl: './module-view.component.css'
})
export class ModuleViewComponent implements OnInit{

  protected module!:ModuleDetailedResponse;
  protected chapterRefreshTrigger:number = 0;
  protected readonly window = globalThis.window;

  private moduleId!:number;

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly moduleService:ModuleService = inject(ModuleService);
  private readonly alertService:AlertService = inject(AlertService);
  private readonly dialog:MatDialog = inject(MatDialog);

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const moduleIdParam = params.get('moduleId') ?? '';
      this.moduleId = Number.parseInt(moduleIdParam);
      if(this.moduleId && !Number.isNaN(this.moduleId)){
        this.fetchModuleDetails(this.moduleId);
      }else{
        this.alertService.triggerErrorAlert("Invalid module id passed via route parameters");
      }
    })
  }

  private fetchModuleDetails(moduleId:number):void{
    this.moduleService.getDetailedModuleById(moduleId).subscribe({
      next: (res)=>{
        if(res.data){
          this.module = res.data;
        }
      },
      error: (err)=>{
        this.alertService.triggerErrorAlert(err.error.message);
      }
    })
  }

  protected openModuleUpdateViewDialog():void{
    const dialogRef = this.dialog.open(ModuleUpdateViewComponent,{
      data : this.module.id,
      maxWidth: '100vh'
    });

    dialogRef.afterClosed().subscribe({
      next:()=>{
        this.fetchModuleDetails(this.moduleId);
      },
      error:() => {
        this.alertService.triggerErrorAlert("Failed to update module");
      }
    })
  }

  protected openChapterCreateDialog():void{
    const dialogRef = this.dialog.open(ChapterCreateDialogComponent,{
      width:'450px',
      data: this.moduleId
    });

    dialogRef.afterClosed().subscribe({
      next:(res)=>{
        if(res){
          this.chapterRefreshTrigger++;
        }
      }
    })
  }

  protected readonly Edit = Edit;
  protected readonly Pen = Pen;
  protected readonly Plus = Plus;
  protected readonly ArrowLeft = ArrowLeft;
}
