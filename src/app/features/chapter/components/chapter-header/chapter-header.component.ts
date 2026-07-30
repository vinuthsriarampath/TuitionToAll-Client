import {Component, computed, inject, input, output} from '@angular/core';
import {ChapterBadgeComponent} from "../chapter-badge/chapter-badge.component";
import {DatePipe} from "@angular/common";
import {ChapterStatus} from '../../enums/ChapterStatus';
import {BadgeComponent} from '@shared/ui';
import {ChapterResponse} from '@features/chapter/dtos/response/ChapterResponse';
import {
  ChapterUpdateDialogComponent
} from '@features/chapter/dialogs/chapter-update-dialog/chapter-update-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {ChapterMapper} from '@features/chapter/mapper/chapter-mapper';

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

  readonly chapterUpdated = output<void>();

    private readonly dialog = inject(MatDialog);
    private readonly route = inject(ActivatedRoute);
    chapter = this.route.snapshot.data['chapter'];


  protected openUpdateChapterDetailsDialog():void{
    const dialogRef = this.dialog.open(ChapterUpdateDialogComponent,{
      width:'450px',
      data: ChapterMapper.toResponse(this.chapter)
    });

    dialogRef.afterClosed().subscribe({
      next:(res)=>{
        if(res) this.chapterUpdated.emit();
      }
    })

  }
}
