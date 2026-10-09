import {Component, inject, input, OnInit, signal} from '@angular/core';
import {PostService} from '@features/posts/services/post-service/post.service';
import {AlertService} from '@core/services/alerts/alert.service';
import {PaginationRequest} from '@shared/utils/requests/PaginationRequest';
import {PostCommentDetailedResponse} from '@features/posts/dtos/responses/post-comment-detailed-response';
import {PostCommentResponse} from '@features/posts/dtos/responses/post-comment-response';
import {User} from '@features/user/dtos/responses/user';
import {UserService} from '@features/user/services/user/user.service';
import {UserHelper} from '@shared/utils/helpers/user-helper';
import {CardShellComponent} from '@shared/ui';
import {PostCommentCardComponent} from '@features/posts/components/post-comment-card/post-comment-card.component';
import {NoContentComponent} from '@shared/components/no-content/no-content.component';
import {PostCommentCreateComponent} from '@features/posts/components/post-comment-create/post-comment-create.component';

@Component({
  selector: 'app-post-comment-list',
  imports: [
    CardShellComponent,
    PostCommentCardComponent,
    NoContentComponent,
    PostCommentCreateComponent
  ],
  templateUrl: './post-comment-list.component.html',
  styleUrl: './post-comment-list.component.css'
})
export class PostCommentListComponent implements OnInit{

  postId = input.required<number>();

  protected comments = signal<PostCommentDetailedResponse[]>([]);
  protected user = signal<User | null>(null);

  protected loading:boolean = false;

  private readonly postService = inject(PostService);
  private readonly alertService = inject(AlertService);
  private readonly userService = inject(UserService);

  protected pageIndex:number = 0;
  private readonly pageSize:number = 10;
  protected totalElements:number = 0;
  protected isLast:boolean = false;

  ngOnInit(): void {
    this.loadComments();
    this.user.set(this.userService.getCurrentUser());
  }

  private loadComments():void{
    this.loading = true;

    const pagination = new PaginationRequest(this.pageIndex, this.pageSize, 'desc', ['created_date']);

    this.postService.getPostComments(this.postId(),pagination).subscribe({
      next: (res) => {
        if(res.data){
          this.comments.set(res.data || []);
          this.pageIndex = res.page ?? 0;
          this.totalElements  = res.totalElements ?? 0;
          this.isLast = res.last ?? false;
        }
        this.loading = false;
      },
      error: err => {
        this.loading = false;
        this.alertService.triggerErrorAlert(err.error?.message || 'An error occurred while loading comments.');
      }
    });
  }

  onPostCommentCreate(comment: PostCommentResponse){
    const currentUser = this.user();

    if(comment && currentUser) {
      const mappedComment: PostCommentDetailedResponse ={
        id: comment.id,
        message: comment.message,
        userId: currentUser.id,
        dp: currentUser.dp,
        userSlug: currentUser.userSlug ?? '',
        displayName: UserHelper.getDisplayName(<User>this.user()),
        createdDate: comment.createdDate,
        updatedDate: ''
      }

      this.comments.update(current => [mappedComment, ...current]);
    }
  }

  onLoadMore():void{
    if(this.isLast) return;
    this.pageIndex++;
    this.loadComments();
  }

  onShowLess():void{
    this.pageIndex = 0;
    this.loadComments();
  }
}
