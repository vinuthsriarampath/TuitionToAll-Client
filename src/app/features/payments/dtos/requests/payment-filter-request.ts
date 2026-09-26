import {PaymentStatus} from '@features/payments/enums/payment-status';
import {PaymentMethod} from '@features/payments/enums/payment-method';

export class MyPaymentFilterRequest {
  id?: number;
  instituteId?: number;
  instituteName?: string;
  status?: PaymentStatus;
  paymentMethod?: PaymentMethod;
  transactionRef?: string;
  createdDate?: string;
}
