import {Component, inject, input, OnInit, output, signal} from '@angular/core';
import {UserFollowService} from '@features/user-follow/services/user-follow-service/user-follow.service';
import {UserUnfollowService} from '@features/user-follow/services/user-unfollow-service/user-unfollow.service';
import {AlertService} from '@core/services/alerts/alert.service';

@Component({
  selector: 'app-follow-button',
  imports: [],
  templateUrl: './follow-button.component.html',
  styleUrl: './follow-button.component.css'
})
export class FollowButtonComponent implements OnInit {
  targetUserId = input.required<number>();
  isSameUser = input<boolean>(false);
  initialFollowingState = input<boolean>(false);

  followChanged = output<boolean>();

  protected isFollowing = signal<boolean>(false);
  protected loading = signal<boolean>(false);

  private readonly followService = inject(UserFollowService);
  private readonly unfollowService = inject(UserUnfollowService);
  private readonly alertService = inject(AlertService);

  ngOnInit() {
    this.isFollowing.set(this.initialFollowingState());
  }

  toggleFollow() {
    this.loading.set(true);
    const targetId = this.targetUserId();

    if (this.isFollowing()) {
      this.unfollowService.unfollowUser(targetId).subscribe({
        next: (res) => {
          if(res.data){
            this.isFollowing.set(false);
            this.loading.set(false);
            this.alertService.triggerSuccessAlert('User unfollowed successfully!');
            this.followChanged.emit(false);
          }
        },
        error: (err) => {
          this.loading.set(false);
          this.alertService.triggerErrorAlert(err.error?.message ?? 'Something went wrong!');
        }
      });
    } else {
      this.followService.followUser(targetId).subscribe({
        next: (res) => {
          if(res.data){
            this.isFollowing.set(true);
            this.loading.set(false);
            this.alertService.triggerSuccessAlert('User followed successfully!');
            this.followChanged.emit(true);
          }
        },
        error: (err) => {
          this.loading.set(false);
          this.alertService.triggerErrorAlert(err.error?.message ?? 'Something went wrong!');
        }
      });
    }
  }
}
