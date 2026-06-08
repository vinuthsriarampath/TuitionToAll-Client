import {ChapterStatus} from '../../enums/ChapterStatus';

export class ChapterResponse {
  id!: number;
  moduleId!: number;
  title!: string;
  chapterOrder!: number;
  status!: ChapterStatus;
  createdDate!: string;
  lastModifiedDate!: string;
}
