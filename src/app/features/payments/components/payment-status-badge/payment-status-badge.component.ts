import {Component, input} from '@angular/core';
import {BadgeComponent} from '@shared/ui';
import {PaymentStatus} from '@features/payments/enums/payment-status';
import {TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-payment-status-badge',
  imports: [
    BadgeComponent,
    TitleCasePipe
  ],
  templateUrl: './payment-status-badge.component.html',
  styleUrl: './payment-status-badge.component.css'
})
export class PaymentStatusBadgeComponent {
    status = input.required<PaymentStatus>();

    get getVariant() {
      switch (this.status()) {
        case PaymentStatus.PAID:
          return 'success';
        case PaymentStatus.PENDING:
          return 'warning';
        default:
          return 'secondary';
      }
    }
}
