import {PostMediaResponse} from '@features/posts/dtos/responses/post-media-response';
import {PostVisibility} from '@features/posts/enums/post-visibility';
import {PostStatus} from '@features/posts/enums/post-status';

export class FeedPostResponse {
  id!: number;
  caption!: string;
  visibility!: PostVisibility;
  status!: PostStatus;
  createdDate!: string;
  publishedDate!: string;
  lastModifiedDate!: string;

  // Author Metadata
  authorId!: number;
  authorName!: string;
  authorSlug!: string;
  authorDp!: string;
  authorRole!: string;

  isFollowingAuthor!: boolean;

  mediaList!: PostMediaResponse[];

  likesCount!: number;
  commentsCount!: number;

  isLiked!: boolean;
}
