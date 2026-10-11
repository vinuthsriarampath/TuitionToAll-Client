import {Component, inject, OnInit, signal} from '@angular/core';
import {PageLayoutComponent} from '@core/layouts';
import {PostCreateComponent} from '@features/posts/components/post-create/post-create.component';
import {FeedPostResponse} from '@features/posts/dtos/responses/feed-post-response';
import {User} from '@features/user/dtos/responses/user';
import {PostService} from '@features/posts/services/post-service/post.service';
import {UserService} from '@features/user/services/user/user.service';
import {PaginationRequest} from '@shared/utils/requests/PaginationRequest';
import {FeedPostCardComponent} from '@features/posts/components/feed-post-card/feed-post-card.component';
import {LucideAngularModule, RssIcon} from 'lucide-angular';

@Component({
  selector: 'app-feed',
  imports: [
    PageLayoutComponent,
    PostCreateComponent,
    FeedPostCardComponent,
    LucideAngularModule
  ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent implements OnInit{
  protected feedPosts = signal<FeedPostResponse[]>([]);
  protected currentUser = signal<User | null>(null);
  protected isLoading = signal<boolean>(false);
  protected isLast = signal<boolean>(false);

  private readonly postService = inject(PostService);
  private readonly userService = inject(UserService);

  private pageIndex = 0;
  private readonly pageSize = 10;

  ngOnInit(): void {
    this.currentUser.set(this.userService.getCurrentUser());
    this.loadFeedPosts();
  }

  loadFeedPosts(): void {
    this.isLoading.set(true);
    const pagination = new PaginationRequest(this.pageIndex, this.pageSize, 'desc', ['published_date']);

    this.postService.getFeedPosts(pagination).subscribe({
      next: (res) => {
        if (res.data) {
          if (this.pageIndex === 0) {
            this.feedPosts.set(res.data);
          } else {
            this.feedPosts.update(current => [...current, ...(res.data ?? [])]);
          }
          this.isLast.set(res.last ?? true);
        }
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  onLoadMore(): void {
    if (this.isLast()) return;
    this.pageIndex++;
    this.loadFeedPosts();
  }

  protected readonly RssIcon = RssIcon;
}
