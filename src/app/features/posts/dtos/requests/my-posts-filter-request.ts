import {PostVisibility} from '@features/posts/enums/post-visibility';
import {PostStatus} from '@features/posts/enums/post-status';

export class MyPostsFilterRequests {
  visibility?: PostVisibility;
  status?: PostStatus;
}
