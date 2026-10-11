import {Component, inject, input, signal} from '@angular/core';
import { AlertService } from "@core/services/alerts/alert.service";
import { environment } from "@env/environment.development";
import { FeedPostResponse } from "@features/posts/dtos/responses/feed-post-response";
import { UserFollowService } from "@features/user-follow/services/user-follow-service/user-follow.service";
import {UserUnfollowService} from '@features/user-follow/services/user-unfollow-service/user-unfollow.service';
import {RouterLink} from '@angular/router';
import {DatePipe, NgOptimizedImage} from '@angular/common';
import {PostVisibility} from '@features/posts/enums/post-visibility';
import {
  Globe,
  Lock,
  LucideAngularModule,
  UserPlus,
  Users
} from 'lucide-angular';
import {PostCardFooterComponent} from '@features/posts/components/post-card-footer/post-card-footer.component';
import {
  PostMediaAttachmentGalleryComponent
} from '@features/posts/components/post-media-attachment-gallery/post-media-attachment-gallery.component';

@Component({
  selector: 'app-feed-post-card',
  imports: [
    RouterLink,
    NgOptimizedImage,
    DatePipe,
    LucideAngularModule,
    PostCardFooterComponent,
    PostMediaAttachmentGalleryComponent
  ],
  templateUrl: './feed-post-card.component.html',
  styleUrl: './feed-post-card.component.css'
})
export class FeedPostCardComponent {
  post = input.required<FeedPostResponse>();
  currentUserId = input<number | null>(null);

  protected isFollowPending = signal<boolean>(false);

  private readonly userFollowService = inject(UserFollowService);
  private readonly userUnFollowService = inject(UserUnfollowService);
  private readonly alertService = inject(AlertService);


  toggleFollowAuthor(): void {
    const authorId = this.post().authorId;
    this.isFollowPending.set(true);

    if (!this.post().isFollowingAuthor) {
      this.userFollowService.followUser(authorId).subscribe({
        next: () => {
          this.post().isFollowingAuthor = true;
          this.isFollowPending.set(false);
        },
        error: (err) => {
          this.isFollowPending.set(false);
          this.alertService.triggerErrorAlert(err.error?.message || 'Failed to follow user.');
        }
      });
    } else {
      this.userUnFollowService.unfollowUser(authorId).subscribe({
        next: () => {
          this.post().isFollowingAuthor = false;
          this.isFollowPending.set(false);
        },
        error: (err) => {
          this.isFollowPending.set(false);
          this.alertService.triggerErrorAlert(err.error?.message || 'Failed to unfollow user.');
        }
      });
    }
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

  protected readonly environment = environment;
  protected readonly PostVisibility = PostVisibility;
  protected readonly Globe = Globe;
  protected readonly Users = Users;
  protected readonly Lock = Lock;
  protected readonly UserPlus = UserPlus;
}
