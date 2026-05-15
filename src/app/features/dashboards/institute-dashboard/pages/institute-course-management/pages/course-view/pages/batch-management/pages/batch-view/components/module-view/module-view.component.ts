import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {ModuleService} from '../../../../../../../../../../../../../core/services/module/module.service';
import {AlertService} from '../../../../../../../../../../../../../core/services/alerts/alert.service';
import {
  ModuleDetailedResponse
} from '../../../../../../../../../../../../../core/dto/response-dto/module/ModuleDetailedResponse';
import {DatePipe, NgOptimizedImage} from '@angular/common';
import {ModuleBadgeComponent} from '../module-badge/module-badge.component';
import {CardShellComponent} from '../../../../../../../../../../../../../shared/ui/card-shell/card-shell.component';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatTooltip} from '@angular/material/tooltip';
import {ArrowLeft, Edit, LucideAngularModule, Pen, Plus, Trash2} from 'lucide-angular';

@Component({
  selector: 'app-module-view',
  imports: [
    DatePipe,
    ModuleBadgeComponent,
    CardShellComponent,
    CdkDropList,
    MatTooltip,
    LucideAngularModule,
    CdkDrag,
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './module-view.component.html',
  styleUrl: './module-view.component.css'
})
export class ModuleViewComponent implements OnInit{

  protected module!:ModuleDetailedResponse;

  private moduleId!:number;

  chapters = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi',
    'Episode IX - The Rise of Skywalker',
  ];


  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly moduleService:ModuleService = inject(ModuleService);
  private readonly alertService:AlertService = inject(AlertService);

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

  protected drop($event: CdkDragDrop<string[]>) {
    moveItemInArray(this.chapters, $event.previousIndex, $event.currentIndex);
  }

  protected readonly Edit = Edit;
  protected readonly Trash2 = Trash2;
  protected readonly Pen = Pen;
  protected readonly Plus = Plus;
  protected readonly ArrowLeft = ArrowLeft;
}
