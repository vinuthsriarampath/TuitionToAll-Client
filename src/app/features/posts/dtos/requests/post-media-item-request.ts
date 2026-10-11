import {PostMediaType} from '@features/posts/enums/post-media-type';

export class PostMediaItemRequest {
  mediaType!: PostMediaType;
  fileOrder!: number;

  constructor(
    mediaType?: PostMediaType,
    fileOrder?: number
  ) {
    if (mediaType !== undefined) {
      this.mediaType = mediaType;
    }

    if (fileOrder !== undefined) {
      this.fileOrder = fileOrder;
    }
  }
}
