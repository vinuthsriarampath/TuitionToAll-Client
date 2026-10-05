import {Component, inject, OnInit} from '@angular/core';
import {AlertService} from '@core/services/alerts/alert.service';
import {UserService} from '@features/user/services/user/user.service';
import {UserBasicResponse} from '@features/user/dtos/responses/user-basic-response';
import {PaginationRequest} from '@shared/utils/requests/PaginationRequest';
import {UserCardComponent} from '@features/user/components/user-card/user-card.component';
import {NoContentComponent} from '@shared/components/no-content/no-content.component';

@Component({
  selector: 'app-my-followers',
  imports: [
    UserCardComponent,
    NoContentComponent
  ],
  templateUrl: './my-followers.component.html',
  styleUrl: './my-followers.component.css'
})
export class MyFollowersComponent implements OnInit{

  protected loading:boolean = false;
  protected followers: UserBasicResponse[] = [];

  private readonly alertService = inject(AlertService);
  private readonly userService = inject(UserService);

  private pageIndex:number = 0;
  private pageSize:number = 10;
  private totalElements:number = 0;

    ngOnInit(): void {
        this.loadFollowers();
    }

    loadFollowers():void{

      this.loading = true;

      const pagination = new PaginationRequest(this.pageIndex, this.pageSize , 'desc', ['followed_on']);
      this.userService.getMyFollowers(pagination).subscribe({
        next: res =>{
          if(res.data){
            this.followers = res.data ?? [];
            this.pageIndex = res.page ?? 0;
            this.pageSize = res.size ?? 10;
            this.totalElements = res.totalElements ?? 0;
            this.loading = false;
          }
        },
        error: err => {
          this.loading = false;
          this.alertService.triggerErrorAlert(err.error?.message ?? 'Something went wrong!');
        }
      })
    }

}
