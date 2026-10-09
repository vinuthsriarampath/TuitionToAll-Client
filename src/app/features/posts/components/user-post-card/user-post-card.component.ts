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
import {environment} from '@env/environment.development';
import {PostService} from '@features/posts/services/post-service/post.service';
import {AlertService} from '@core/services/alerts/alert.service';

@Component({
  selector: 'app-user-post-card',
  imports: [
    NgClass,
    DatePipe,
    LucideAngularModule,
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

  private readonly postService = inject(PostService);
  private readonly alertService = inject(AlertService);

  toggleMenu(): void {
    this.showMenu.update(v => !v);
  }

  getMediaUrl(filename: string): string {
    return `${environment.POST_API}/media/${filename}`;
  }

  likeDislikePost(postId: number): void {
    if (!this.post().isLiked){
      this.postService.likePost(postId).subscribe({
        next: () => {
          this.post().isLiked = true;
          this.post().likesCount += 1;
        },
        error: (err) => {
          this.alertService.triggerErrorAlert(err.error?.message || 'An error occurred while liking the post.');
        }
      });
    } else {
      this.postService.dislikePost(postId).subscribe({
        next: () => {
          this.post().isLiked = false;
          this.post().likesCount -= 1;
        },
        error: (err) => {
          this.alertService.triggerErrorAlert(err.error?.message || 'An error occurred while disliking the post.');
        }
      });
    }
  }

  protected readonly Heart = Heart;
  protected readonly MessageCircleMore = MessageCircleMore;
  protected readonly Download = Download;
  protected readonly Files = Files;
  protected readonly PostMediaType = PostMediaType;
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
