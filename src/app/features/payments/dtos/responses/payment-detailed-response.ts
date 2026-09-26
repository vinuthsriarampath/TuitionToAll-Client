import {PaymentMethod} from '@features/payments/enums/payment-method';
import {PaymentStatus} from '@features/payments/enums/payment-status';

export class PaymentDetailedResponse {
  id!: number;
  studentId!: number;
  studentName!: string;
  instituteId!: number;
  instituteName!: string;
  amount!: number;
  status!: PaymentStatus;
  paymentMethod!: PaymentMethod;
  transactionRef!: string;
  createdDate!: string;
  lastModifiedDate!: string;
}
