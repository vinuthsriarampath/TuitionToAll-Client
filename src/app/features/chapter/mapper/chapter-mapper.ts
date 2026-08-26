import {ChapterDetailedResponse} from '@features/chapter/dtos/response/ChapterDetailedResponse';
import {ChapterResponse} from '@features/chapter/dtos/response/ChapterResponse';

export class ChapterMapper {
  static toResponse(chapter: ChapterDetailedResponse): ChapterResponse {
    return {
      id: chapter.id,
      moduleId: chapter.module.id,
      title: chapter.title,
      chapterOrder: chapter.chapterOrder,
      status: chapter.status,
      createdDate: chapter.createdDate,
      lastModifiedDate: chapter.lastModifiedDate
    };
  }
}
