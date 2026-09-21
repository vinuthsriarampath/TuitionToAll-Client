import {Routes} from '@angular/router';

export const PAYMENT_RECEIVES_ROUTES:Routes = [
  {
    path: '',
    title: 'Payment Receives',
    data: {breadcrumb: null},
    loadComponent: () => import('@features/payments/pages/my-receives/my-receives.component').then(m => m.MyReceivesComponent)
  }
]
