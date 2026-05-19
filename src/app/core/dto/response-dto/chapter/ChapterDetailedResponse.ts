import {ChapterStatus} from '../../../enums/ChapterStatus';
import {ModuleResponse} from '../module/ModuleResponse';

export class ChapterDetailedResponse{
  id!: number;
  module!: ModuleResponse;
  title!: string;
  chapterOrder!: number;
  status!: ChapterStatus;
  createdDate!: string;
  lastModifiedDate!: string;
}
