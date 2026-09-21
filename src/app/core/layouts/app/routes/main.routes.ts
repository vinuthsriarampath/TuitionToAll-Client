import {Routes} from '@angular/router';
import {tokenGuard} from '@core/guards/token-guard/token.guard';
import {authGuard} from '@core/guards/auth-guard/auth.guard';

export const MAIN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('@core/layouts/app/app.component').then(m => m.AppComponent),
    canActivateChild: [tokenGuard,authGuard],
    children: [
      {
        path:'',
        title: 'Feed',
        loadComponent: () => import('@features/feed/pages/feed.component').then(m => m.FeedComponent),
      },

    ]
  },
];
