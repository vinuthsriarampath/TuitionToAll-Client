import { ResolveFn } from '@angular/router';
import {ChapterDetailedResponse} from '@features/chapter/dtos/response/ChapterDetailedResponse';
import {inject} from '@angular/core';
import { ChapterService } from "../services/chapter/chapter.service";
import {map} from 'rxjs/operators';

export const chapterResolver: ResolveFn<ChapterDetailedResponse> = (route, state) => {
  const chapterService = inject(ChapterService);
  return chapterService.getDetailedChapterById(Number(route.paramMap.get('chapterId'))).pipe(
    map((res) => res.data as ChapterDetailedResponse)
  );
};
