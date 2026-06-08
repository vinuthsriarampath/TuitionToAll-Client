import {ChapterStatus} from '../../enums/ChapterStatus';

export class ChapterCreateRequest {
  moduleId!: number;
  title!: string;
  status!: ChapterStatus;
}
