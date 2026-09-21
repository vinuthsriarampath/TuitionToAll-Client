import {PaymentStatus} from '@features/payments/enums/payment-status';
import {PaymentMethod} from '@features/payments/enums/payment-method';

export class MyPaymentReceivesFilterRequest {
  id?: number;
  studentId?: number;
  studentName?: string;
  status?: PaymentStatus;
  paymentMethod?: PaymentMethod;
  transactionRef?: string;
  createdDate?: string;
}
