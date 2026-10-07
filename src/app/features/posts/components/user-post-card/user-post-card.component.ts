import {Component, input, output, signal} from '@angular/core';
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
import {DatePipe, NgClass, NgOptimizedImage} from '@angular/common';
import {PostStatus} from '@features/posts/enums/post-status';
import {PostVisibility} from '@features/posts/enums/post-visibility';
import {environment} from '@env/environment.development';

@Component({
  selector: 'app-user-post-card',
  imports: [
    NgClass,
    DatePipe,
    LucideAngularModule,
    NgOptimizedImage
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

  getMediaUrl(filename: string): string {
    return `${environment.POST_API}/media/${filename}`;
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
