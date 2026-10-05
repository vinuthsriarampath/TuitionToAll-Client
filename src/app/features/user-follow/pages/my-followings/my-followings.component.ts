import {Component, inject, OnInit} from '@angular/core';
import {UserBasicResponse} from '@features/user/dtos/responses/user-basic-response';
import {AlertService} from '@core/services/alerts/alert.service';
import {UserService} from '@features/user/services/user/user.service';
import {PaginationRequest} from '@shared/utils/requests/PaginationRequest';
import {UserCardComponent} from '@features/user/components/user-card/user-card.component';
import {NoContentComponent} from '@shared/components/no-content/no-content.component';

@Component({
  selector: 'app-my-followings',
  imports: [
    UserCardComponent,
    NoContentComponent
  ],
  templateUrl: './my-followings.component.html',
  styleUrl: './my-followings.component.css'
})
export class MyFollowingsComponent implements OnInit {
  protected loading:boolean = false;
  protected followings: UserBasicResponse[] = [];

  private readonly alertService = inject(AlertService);
  private readonly userService = inject(UserService);

  private pageIndex:number = 0;
  private pageSize:number = 10;
  private totalElements:number = 0;

  ngOnInit(): void {
    this.loadFollowings();
  }

  loadFollowings():void{

    this.loading = true;

    const pagination = new PaginationRequest(this.pageIndex, this.pageSize , 'desc', ['followed_on']);
    this.userService.getMyFollowings(pagination).subscribe({
      next: res =>{
        if(res.data){
          this.followings = res.data ?? [];
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
