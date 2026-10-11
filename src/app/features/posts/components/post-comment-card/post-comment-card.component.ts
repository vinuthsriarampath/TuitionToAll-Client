import {Component, input} from '@angular/core';
import {PostCommentDetailedResponse} from '@features/posts/dtos/responses/post-comment-detailed-response';
import {CardShellComponent} from '@shared/ui';
import {DatePipe, NgOptimizedImage} from '@angular/common';
import {UserHelper} from '@shared/utils/helpers/user-helper';
import {environment} from '@env/environment.development';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-post-comment-card',
  imports: [
    CardShellComponent,
    NgOptimizedImage,
    DatePipe,
    RouterLink
  ],
  templateUrl: './post-comment-card.component.html',
  styleUrl: './post-comment-card.component.css'
})
export class PostCommentCardComponent {
  comment = input.required<PostCommentDetailedResponse>();
  protected readonly UserHelper = UserHelper;
  protected readonly environment = environment;
}
