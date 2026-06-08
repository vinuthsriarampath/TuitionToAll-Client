import {Component, input} from '@angular/core';
import {ChapterBadgeComponent} from "../chapter-badge/chapter-badge.component";
import {DatePipe} from "@angular/common";
import {ChapterStatus} from '../../enums/ChapterStatus';

@Component({
  selector: 'app-chapter-header',
    imports: [
        ChapterBadgeComponent,
        DatePipe
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
}
