import {Routes} from '@angular/router';
import {AppComponent} from '@core/layouts';
import {tokenGuard} from '@core/guards/token-guard/token.guard';
import {authGuard} from '@core/guards/auth-guard/auth.guard';
import {FeedComponent} from '@features/feed/pages/feed.component';

export const MAIN_ROUTES: Routes = [
  {
    path: '',
    component: AppComponent,
    canActivateChild: [tokenGuard,authGuard],
    children: [
      {
        path:'',
        component:FeedComponent
      },

    ]
  },
];
