import {Component, input} from '@angular/core';
import {Download, Files, LucideAngularModule} from "lucide-angular";
import {PostMediaType} from '@features/posts/enums/post-media-type';
import {environment} from '@env/environment.development';
import {PostMediaResponse} from '@features/posts/dtos/responses/post-media-response';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-post-media-attachment-gallery',
  imports: [
    LucideAngularModule,
    NgClass
  ],
  templateUrl: './post-media-attachment-gallery.component.html',
  styleUrl: './post-media-attachment-gallery.component.css'
})
export class PostMediaAttachmentGalleryComponent {
  mediaList = input.required<PostMediaResponse[]>();

  getMediaUrl(filename: string): string {
    return `${environment.POST_API}/media/${filename}`;
  }

  protected readonly Files = Files;
  protected readonly Download = Download;
  protected readonly PostMediaType = PostMediaType;
}
