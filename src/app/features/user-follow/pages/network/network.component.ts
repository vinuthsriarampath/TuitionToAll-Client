import { Component } from '@angular/core';
import {PageLayoutComponent} from '@core/layouts';
import {MatTab, MatTabContent, MatTabGroup} from '@angular/material/tabs';
import {MyFollowersComponent} from '@features/user-follow/pages/my-followers/my-followers.component';
import {MyFollowingsComponent} from '@features/user-follow/pages/my-followings/my-followings.component';

@Component({
  selector: 'app-network',
  imports: [
    PageLayoutComponent,
    MatTab,
    MatTabGroup,
    MatTabContent,
    MyFollowersComponent,
    MyFollowingsComponent
  ],
  templateUrl: './network.component.html',
  styleUrl: './network.component.css'
})
export class NetworkComponent {

}
