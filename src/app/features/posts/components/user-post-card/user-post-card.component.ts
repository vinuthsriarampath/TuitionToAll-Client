import {Component, inject, input, output, signal} from '@angular/core';
import {UserPostResponse} from '@features/posts/dtos/responses/user-post-response';
import {
  Download,
  Edit,
  Files, Globe,
  Heart,
  Lock, LucideAngularModule,
  MessageCircleMore,
  MoreHorizontal,
  Send,
  Trash,
  Users
} from 'lucide-angular';
import {PostMediaType} from '@features/posts/enums/post-media-type';
import {DatePipe, NgClass} from '@angular/common';
import {PostStatus} from '@features/posts/enums/post-status';
import {PostVisibility} from '@features/posts/enums/post-visibility';
import {PostCardFooterComponent} from '@features/posts/components/post-card-footer/post-card-footer.component';
import {
  PostMediaAttachmentGalleryComponent
} from '@features/posts/components/post-media-attachment-gallery/post-media-attachment-gallery.component';

@Component({
  selector: 'app-user-post-card',
  imports: [
    NgClass,
    DatePipe,
    LucideAngularModule,
    PostCardFooterComponent,
    PostMediaAttachmentGalleryComponent,
  ],
  templateUrl: './user-post-card.component.html',
  styleUrl: './user-post-card.component.css'
})
export class UserPostCardComponent {
  post = input.required<UserPostResponse>();
  isOwner = input<boolean>(false);

  // Actions emitted to parent container
  editPost = output<UserPostResponse>();
  deletePost = output<number>();
  publishPost = output<number>();
  archivePost = output<number>();

  protected showMenu = signal<boolean>(false);

  toggleMenu(): void {
    this.showMenu.update(v => !v);
  }

  onLiked() {
    if(this.post().isLiked) {
      return
    }else {
      this.post().isLiked = true;
      this.post().likesCount += 1;
    }
  }

  onDislike(){
    if (!this.post().isLiked) {
      return
    }else {
      this.post().isLiked = false;
      this.post().likesCount -= 1;
    }
  }

  protected readonly Download = Download;
  protected readonly Trash = Trash;
  protected readonly Edit = Edit;
  protected readonly Send = Send;
  protected readonly PostStatus = PostStatus;
  protected readonly MoreHorizontal = MoreHorizontal;
  protected readonly Users = Users;
  protected readonly Lock = Lock;
  protected readonly PostVisibility = PostVisibility;
  protected readonly Globe = Globe;
}
