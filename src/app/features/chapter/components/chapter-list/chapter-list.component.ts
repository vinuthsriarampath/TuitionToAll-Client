import {Component, inject, input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {CardShellComponent} from '@shared/ui';
import {CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {BookOpen, CalendarDays, Edit, GripVertical, LucideAngularModule, Pencil} from 'lucide-angular';
import {MatTooltip} from '@angular/material/tooltip';
import {ChapterResponse} from '../../dtos/response/ChapterResponse';
import {ModuleService} from '../../../module/services/module/module.service';
import {AlertService} from '@core/services/alerts/alert.service';
import {DatePipe} from '@angular/common';
import {ChapterBadgeComponent} from '../chapter-badge/chapter-badge.component';
import {MatDialog} from '@angular/material/dialog';
import {ChapterUpdateDialogComponent} from '../../dialogs/chapter-update-dialog/chapter-update-dialog.component';
import {ChapterReorderRequest} from '../../dtos/request/ChapterReorderRequest';
import {ChapterService} from '../../services/chapter/chapter.service';

@Component({
  selector: 'app-chapter-list',
  imports: [
    CardShellComponent,
    CdkDrag,
    CdkDropList,
    LucideAngularModule,
    MatTooltip,
    DatePipe,
    CdkDragHandle,
    ChapterBadgeComponent,
    RouterLink
  ],
  templateUrl: './chapter-list.component.html',
  styleUrl: './chapter-list.component.css'
})
export class ChapterListComponent implements OnInit, OnChanges {

  protected chapters:ChapterResponse[] = [];

  private moduleId!:number;
  private readonly dialog:MatDialog = inject(MatDialog);
  private readonly moduleService:ModuleService = inject(ModuleService);
  private readonly chapterService:ChapterService= inject(ChapterService);
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
    const refreshChange = changes['triggerRefresh'];

    if (refreshChange && !refreshChange.firstChange) {
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

  protected openUpdateChapterDetailsDialog(chapter:ChapterResponse):void{
    const dialogRef = this.dialog.open(ChapterUpdateDialogComponent,{
      width:'450px',
      data: chapter
    });

    dialogRef.afterClosed().subscribe({
      next:(res)=>{
        if(res) this.loadChaptersByModule();
      }
    })

  }

  protected drop($event: CdkDragDrop<string[]>) {
    // prevent unnecessary request
    if ($event.previousIndex === $event.currentIndex) {
      return;
    }

    // update UI instantly
    moveItemInArray(this.chapters, $event.previousIndex, $event.currentIndex);

    // build reorder request
    const request: ChapterReorderRequest = {
      chapters: this.chapters.map((chapter, index) => ({
        chapterId: chapter.id,
        chapterOrder: index + 1
      }))
    };

    // send request
    this.chapterService.reorderChapters(request).subscribe({
      next: (res) => {

        // optional -> refresh with backend data
        if (res.data) {
          this.chapters = res.data;
        }

        this.alertService.triggerSuccessAlert('Chapter order updated');
      },
      error: (err) => {
        this.alertService.triggerErrorAlert(err.error.message);

        // rollback UI if request fails
        moveItemInArray(this.chapters, $event.currentIndex, $event.previousIndex);
      }
    });

  }

  protected readonly Edit = Edit;
  protected readonly BookOpen = BookOpen;
  protected readonly Pencil = Pencil;
  protected readonly CalendarDays = CalendarDays;
  protected readonly GripVertical = GripVertical;
}
