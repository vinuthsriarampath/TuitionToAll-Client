import {Component, inject, input, OnInit, signal} from '@angular/core';
import {NoContentComponent} from '@shared/components/no-content/no-content.component';
import {UserPostResponse} from '@features/posts/dtos/responses/user-post-response';
import {PostStatus} from '@features/posts/enums/post-status';
import {PostVisibility} from '@features/posts/enums/post-visibility';
import {PostService} from '@features/posts/services/post-service/post.service';
import {MyPostsFilterRequests} from '@features/posts/dtos/requests/my-posts-filter-request';
import {PaginationRequest} from '@shared/utils/requests/PaginationRequest';
import {UserPostCardComponent} from '@features/posts/components/user-post-card/user-post-card.component';
import {Funnel, LucideAngularModule} from 'lucide-angular';
import {PostCreateComponent} from '@features/posts/components/post-create/post-create.component';

@Component({
  selector: 'app-user-posts',
  imports: [
    NoContentComponent,
    UserPostCardComponent,
    LucideAngularModule,
    PostCreateComponent
  ],
  templateUrl: './user-posts.component.html',
  styleUrl: './user-posts.component.css'
})
export class UserPostsComponent implements OnInit {
  targetUserId = input.required<number>();
  isOwner = input<boolean>(false);

  protected posts = signal<UserPostResponse[]>([]);
  protected isLoading = signal<boolean>(false);

  // Filter State (Self View)
  protected selectedStatus = signal<PostStatus | undefined>(undefined);
  protected selectedVisibility = signal<PostVisibility | undefined>(undefined);

  private readonly postService = inject(PostService);
  private readonly pagination: PaginationRequest = { page: 0, size: 10, sortBy: ['published_date'], direction: 'desc' };

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.isLoading.set(true);

    if (this.isOwner()) {
      const filters: MyPostsFilterRequests = {
        status: this.selectedStatus(),
        visibility: this.selectedVisibility()
      };
      this.postService.getMyPosts(this.pagination, filters).subscribe({
        next: (res) => {
          this.posts.set(res.data ?? []);
          this.isLoading.set(false);
        },
        error: () => this.isLoading.set(false)
      });
    } else {
      this.postService.getUserPosts(this.targetUserId(), this.pagination).subscribe({
        next: (res) => {
          this.posts.set(res.data ?? []);
          this.isLoading.set(false);
        },
        error: () => this.isLoading.set(false)
      });
    }
  }

  onFilterStatusChange(event: Event): void {
    const val = (event.target as HTMLSelectElement).value;
    this.selectedStatus.set(val ? (val as PostStatus) : undefined);
    this.loadPosts();
  }

  onFilterVisibilityChange(event: Event): void {
    const val = (event.target as HTMLSelectElement).value;
    this.selectedVisibility.set(val ? (val as PostVisibility) : undefined);
    this.loadPosts();
  }

  // Prepend new created post to state dynamically
  addPostToFeed(newPost: UserPostResponse): void {
    this.posts.update(current => [newPost, ...current]);
  }

  protected readonly Funnel = Funnel;
}
