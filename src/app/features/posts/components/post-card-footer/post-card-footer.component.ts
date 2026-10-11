import {Component, inject, input, output, signal} from '@angular/core';
import {Heart, LucideAngularModule, MessageCircleMore} from 'lucide-angular';
import {PostCommentListComponent} from '@features/posts/components/post-comment-list/post-comment-list.component';
import {PostService} from '@features/posts/services/post-service/post.service';
import {AlertService} from '@core/services/alerts/alert.service';

@Component({
  selector: 'app-post-card-footer',
  imports: [
    LucideAngularModule,
    PostCommentListComponent
  ],
  templateUrl: './post-card-footer.component.html',
  styleUrl: './post-card-footer.component.css'
})
export class PostCardFooterComponent {

  postId = input.required<number>();
  postLikeCount = input.required<number>();
  postIsLiked = input.required<boolean>();
  postCommentCount = input.required<number>();

  liked = output<void>();
  disliked = output<void>();

  protected showComments = signal<boolean>(false);

  private readonly postService = inject(PostService);
  private readonly alertService = inject(AlertService);

  likeDislikePost(): void {
    if (!this.postIsLiked()){
      this.postService.likePost(this.postId()).subscribe({
        next: () => {
          this.liked.emit();
        },
        error: (err) => {
          this.alertService.triggerErrorAlert(err.error?.message || 'An error occurred while liking the post.');
        }
      });
    } else {
      this.postService.dislikePost(this.postId()).subscribe({
        next: () => {
          this.disliked.emit();
        },
        error: (err) => {
          this.alertService.triggerErrorAlert(err.error?.message || 'An error occurred while disliking the post.');
        }
      });
    }
  }

  onComment():void{
    this.showComments.update(b => !b);
  }

  protected readonly MessageCircleMore = MessageCircleMore;
  protected readonly Heart = Heart;
}
