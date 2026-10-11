import {PostMediaType} from '@features/posts/enums/post-media-type';

export class PostMediaResponse {
  id!: number;
  mediaUrl!: string;
  mediaType!: PostMediaType;
  fileOrder!: number;
}
