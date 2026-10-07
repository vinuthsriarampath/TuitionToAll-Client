import {PostCreateStatus} from '@features/posts/dtos/requests/enums/post-create-status';
import {PostVisibility} from '@features/posts/enums/post-visibility';
import {PostMediaItemRequest} from '@features/posts/dtos/requests/post-media-item-request';

export class PostCreateRequest {
  caption!: string;
  visibility!: PostVisibility;
  status!: PostCreateStatus;
  mediaItems!: PostMediaItemRequest[];

  constructor(
    caption?: string,
    visibility?: PostVisibility,
    status?: PostCreateStatus,
    mediaItems: PostMediaItemRequest[] = []
  ) {
    if (caption !== undefined) {
      this.caption = caption;
    }

    if (visibility !== undefined) {
      this.visibility = visibility;
    }

    if (status !== undefined) {
      this.status = status;
    }

    this.mediaItems = mediaItems;
  }
}
