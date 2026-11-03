import {PostMediaItemRequest} from '@features/posts/dtos/requests/post-media-item-request';
import {PostStatus} from '@features/posts/enums/post-status';
import {PostVisibility} from '@features/posts/enums/post-visibility';

export interface PostUpdateRequest {
  caption: string;
  visibility: PostVisibility;
  status: PostStatus;
  removeMediaIds: number[];
  newMediaItems: PostMediaItemRequest[];
}
