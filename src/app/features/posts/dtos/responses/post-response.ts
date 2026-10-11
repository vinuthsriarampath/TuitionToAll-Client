import {PostMediaResponse} from '@features/posts/dtos/responses/post-media-response';
import {PostVisibility} from '@features/posts/enums/post-visibility';
import {PostStatus} from '@features/posts/enums/post-status';

export class PostResponse {
  id!: number;
  userId!: number;
  caption!: string;
  visibility!: PostVisibility;
  status!: PostStatus;
  createdDate!: string;
  publishedDate!: string;
  lastModifiedDate!: string;
  mediaList!: PostMediaResponse[];
}
