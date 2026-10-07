import {PostMediaResponse} from '@features/posts/dtos/responses/post-media-response';
import {PostVisibility} from '@features/posts/enums/post-visibility';
import {PostStatus} from '@features/posts/enums/post-status';

export class UserPostResponse {
  id!: number;
  caption!: string;
  visibility!: PostVisibility;
  status!: PostStatus;
  createdDate!: string;
  publishedDate!: string;
  lastModifiedDate!: string;

  mediaList!: PostMediaResponse[];

  likesCount!: number;
  commentsCount!: number;
  isLiked!: boolean;
}
