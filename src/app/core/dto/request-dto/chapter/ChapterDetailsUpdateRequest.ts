import {ChapterStatus} from '../../../enums/ChapterStatus';

export class ChapterDetailsUpdateRequest {
  title!: string;
  status!: ChapterStatus;
  moduleId!: number;
}
