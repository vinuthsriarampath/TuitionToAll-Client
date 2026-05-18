import {Component, inject, input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CardShellComponent} from '../../../../../../../../../../../../../shared/ui/card-shell/card-shell.component';
import {CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {BookOpen, CalendarDays, Edit, GripVertical, LucideAngularModule, Pencil, Trash2} from 'lucide-angular';
import {MatTooltip} from '@angular/material/tooltip';
import {ChapterResponse} from '../../../../../../../../../../../../../core/dto/response-dto/chapter/ChapterResponse';
import {ModuleService} from '../../../../../../../../../../../../../core/services/module/module.service';
import {AlertService} from '../../../../../../../../../../../../../core/services/alerts/alert.service';
import {DatePipe, NgClass} from '@angular/common';
import {ChapterBadgeComponent} from '../chapter-badge/chapter-badge.component';

@Component({
  selector: 'app-chapter-list',
  imports: [
    CardShellComponent,
    CdkDrag,
    CdkDropList,
    LucideAngularModule,
    MatTooltip,
    DatePipe,
    NgClass,
    CdkDragHandle,
    ChapterBadgeComponent
  ],
  templateUrl: './chapter-list.component.html',
  styleUrl: './chapter-list.component.css'
})
export class ChapterListComponent implements OnInit, OnChanges {

  protected chapters:ChapterResponse[] = [];

  private moduleId!:number;
  private readonly moduleService:ModuleService = inject(ModuleService);
  private readonly activatedRoute:ActivatedRoute = inject(ActivatedRoute);
  private readonly alertService = inject(AlertService);

  triggerRefresh = input.required<number>();

  ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe(params => {
        const moduleIdParams = params.get('moduleId') ?? '';
        if(Number.parseInt(moduleIdParams) && !Number.isNaN(Number.parseInt(moduleIdParams))){
          this.moduleId = Number.parseInt(moduleIdParams);
          this.loadChaptersByModule();
        }else {
          this.alertService.triggerErrorAlert("Invalid module id passed via route parameters")
        }
      })
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("inside chapter list on changes")
    const refreshChange = changes['triggerRefresh'];

    if (refreshChange && !refreshChange.firstChange) {
      console.log("inside load chapters by module if condition")
      this.loadChaptersByModule();
    }
  }

  private loadChaptersByModule():void{
    this.moduleService.getChaptersByModuleId(this.moduleId).subscribe({
      next:(res)=>{
        if(res.data) this.chapters = res.data;
      },
      error:(err)=>{
        this.alertService.triggerErrorAlert(err.error.message)
      }
    })
  }

  protected drop($event: CdkDragDrop<string[]>) {
    moveItemInArray(this.chapters, $event.previousIndex, $event.currentIndex);
  }

  protected readonly Edit = Edit;
  protected readonly Trash2 = Trash2;
  protected readonly BookOpen = BookOpen;
  protected readonly Pencil = Pencil;
  protected readonly CalendarDays = CalendarDays;
  protected readonly GripVertical = GripVertical;
}
