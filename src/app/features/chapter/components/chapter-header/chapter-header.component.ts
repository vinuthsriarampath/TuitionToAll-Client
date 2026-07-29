import {Component, inject, input} from '@angular/core';
import {ChapterBadgeComponent} from "../chapter-badge/chapter-badge.component";
import {DatePipe} from "@angular/common";
import {ChapterStatus} from '../../enums/ChapterStatus';
import {BadgeComponent} from '@shared/ui';
import {ChapterResponse} from '@features/chapter/dtos/response/ChapterResponse';
import {
  ChapterUpdateDialogComponent
} from '@features/chapter/dialogs/chapter-update-dialog/chapter-update-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-chapter-header',
  imports: [
    ChapterBadgeComponent,
    DatePipe,
    BadgeComponent
  ],
  templateUrl: './chapter-header.component.html',
  styleUrl: './chapter-header.component.css'
})
export class ChapterHeaderComponent {
    title = input.required<string>();
    status = input.required<ChapterStatus>();
    chapterOrder = input.required<number>();
    moduleName = input.required<string>();
    createdDate = input.required<string>();
    lastModifiedDate = input.required<string>();

    private readonly dialog = inject(MatDialog);

  protected openUpdateChapterDetailsDialog(chapter:ChapterResponse):void{
    const dialogRef = this.dialog.open(ChapterUpdateDialogComponent,{
      width:'450px',
      data: chapter
    });

    dialogRef.afterClosed().subscribe({
      next:(res)=>{
        // if(res) this.loadChaptersByModule();
      }
    })

  }
}
