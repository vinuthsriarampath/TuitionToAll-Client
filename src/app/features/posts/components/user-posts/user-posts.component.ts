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
import {combineLatest, distinctUntilChanged, switchMap} from 'rxjs';
import {toObservable} from '@angular/core/rxjs-interop';
import {MatDialog} from '@angular/material/dialog';
import {PostUpdateDialogComponent} from '@features/posts/dialogs/post-update-dialog/post-update-dialog.component';
import {PostResponse} from '@features/posts/dtos/responses/post-response';
import {AlertService} from '@core/services/alerts/alert.service';

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
  private readonly alertService = inject(AlertService);
  private readonly dialog = inject(MatDialog);

  private readonly pagination: PaginationRequest = { page: 0, size: 10, sortBy: ['published_date'], direction: 'desc' };

  private readonly targetUserId$ = toObservable(this.targetUserId);
  private readonly isOwner$ = toObservable(this.isOwner);

  ngOnInit(): void {
    // Reactively listen to changes in targetUserId or isOwner
    combineLatest([this.targetUserId$, this.isOwner$])
      .pipe(
        distinctUntilChanged(([prevId, prevOwner], [currId, currOwner]) =>
          prevId === currId && prevOwner === currOwner
        ),// prevents duplicate calls if the values are same
        switchMap(([userId, isOwner]) => {
          this.isLoading.set(true);

          if (isOwner) {
            const filters: MyPostsFilterRequests = {
              status: this.selectedStatus(),
              visibility: this.selectedVisibility()
            };
            return this.postService.getMyPosts(this.pagination, filters);
          } else {
            return this.postService.getUserPosts(userId, this.pagination);
          }
        })// switchMap will cancel the previous request if a new one comes in, ensuring only the latest request is processed
      )
      .subscribe({
        next: (res) => {
          this.posts.set(res.data ?? []);
          this.isLoading.set(false);
        },
        error: () => {
          this.posts.set([]);
          this.isLoading.set(false);
        }
      });
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

  editPost(post:UserPostResponse):void {
    const postResponse :PostResponse = {
      id: post.id,
      caption: post.caption,
      visibility: post.visibility,
      status: post.status,
      userId: this.targetUserId(),
      createdDate: post.createdDate,
      publishedDate: post.publishedDate,
      lastModifiedDate: post.lastModifiedDate,
      mediaList: post.mediaList
    };

    const dialogRef = this.dialog.open(PostUpdateDialogComponent, {
      width: '600px',
      maxWidth: '95vw',
      data: postResponse
    });

    dialogRef.afterClosed().subscribe({
      next: (updatedPostData: PostResponse | false) => {
        if (updatedPostData) {
          this.posts.update(current => current.map(p => p.id === post.id ? {
            ...p,
            ...updatedPostData
          } : p));
        }
      },
      error: () => {
        this.alertService.triggerErrorAlert('Failed to update post dialog session.');
      }
    });
  }

  publishDraftPosts(postId:number):void{
    this.alertService.triggerSuccessConfirmationAlert({
      type: 'success',
      confirmText: 'Yes, Publish',
      icon: Funnel,
      title: 'Publish Draft Post',
      message: 'Are you sure you want to publish this draft post? Once published, it will be visible to others.',
      confirmButtonClass: 'btn btn-mini-primary btn-success'
    }).subscribe({
      next: (confirmed) => {
        if (confirmed) {
          this.postService.publishDraftPost(postId).subscribe({
            next: () => {
              this.alertService.triggerSuccessAlert('Published successfully!');
              this.posts.update(current => current.map(post => post.id === postId ? { ...post, status: PostStatus.PUBLISHED } : post));
            },
            error: (err) => {
              this.alertService.triggerErrorAlert(err.error?.message || 'Failed to publish draft post');
            }
          });
        }
      },
      error: () => {
        this.alertService.triggerErrorAlert('Failed to confirm draft post publication.');
      }
    })
  }

  protected readonly Funnel = Funnel;
}
