import {Component, input} from '@angular/core';
import {ChapterStatus} from '../../enums/ChapterStatus';
import {CardShellComponent, InfoRowComponent} from '@shared/ui';

@Component({
  selector: 'app-chapter-overview',
  imports: [
    CardShellComponent,
    InfoRowComponent
  ],
  templateUrl: './chapter-overview.component.html',
  styleUrl: './chapter-overview.component.css'
})
export class ChapterOverviewComponent {

  chapterOrder = input.required<number>();
  moduleName = input.required<string>();
  status = input.required<ChapterStatus>();
  loading = input<boolean>(false);
}
