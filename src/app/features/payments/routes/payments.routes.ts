import {Routes} from '@angular/router';

export const PAYMENT_ROUTES: Routes = [
  {
    path: '',
    title: "Payments",
    data: {breadcrumb: null},
    loadComponent: () => import('@features/payments/pages/my-payments/my-payments.component').then(m => m.MyPaymentsComponent)
  }
]
