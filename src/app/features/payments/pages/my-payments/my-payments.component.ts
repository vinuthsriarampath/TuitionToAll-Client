import {Component, inject, OnInit} from '@angular/core';
import {PageLayoutComponent} from '@core/layouts';
import {PaymentService} from '@features/payments/services/payment-service/payment.service';
import {AlertService} from '@core/services/alerts/alert.service';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {PaymentDetailedResponse} from '@features/payments/dtos/responses/payment-detailed-response';
import {PaginationRequest} from '@shared/utils/requests/PaginationRequest';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {NoContentComponent} from '@shared/components/no-content/no-content.component';
import {CurrencyPipe, DatePipe, TitleCasePipe} from '@angular/common';
import {
  PaymentStatusBadgeComponent
} from '@features/payments/components/payment-status-badge/payment-status-badge.component';
import {BasePaginatedFilterComponent} from '@shared/utils/base/BasePaginatedFilterComponent';
import {MyPaymentFilterRequest} from '@features/payments/dtos/requests/payment-filter-request';
import {Observable} from 'rxjs';
import {NonNullableFormBuilder} from '@angular/forms';
import {PaymentMethod} from '@features/payments/enums/payment-method';
import {PaymentStatus} from '@features/payments/enums/payment-status';
import {FilterFieldConfig} from '@shared/utils/config/filter-config';
import {CardShellComponent} from '@shared/ui';
import {FilterToolbarComponent} from '@shared/components/filter-toolbar/filter-toolbar.component';
import {ArrowUpDown, LucideAngularModule} from 'lucide-angular';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'app-my-payments',
  imports: [
    PageLayoutComponent,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatNoDataRow,
    NoContentComponent,
    CurrencyPipe,
    PaymentStatusBadgeComponent,
    DatePipe,
    MatPaginator,
    CardShellComponent,
    FilterToolbarComponent,
    LucideAngularModule,
    MatTooltip,
    TitleCasePipe
  ],
  templateUrl: './my-payments.component.html',
  styleUrl: './my-payments.component.css'
})
export class MyPaymentsComponent extends BasePaginatedFilterComponent<PaymentDetailedResponse, MyPaymentFilterRequest>{
  protected displayedColumns: string[] = ['id','institute','amount', 'status', 'paymentMethod', 'createdAt'];
  sortByFields: string[] = ['created_date'];

  private readonly paymentService = inject(PaymentService);
  private readonly fb = inject(NonNullableFormBuilder);

  protected filterForm = this.fb.group({
    instituteName: [''],
    transactionRef: [''],
    status: [undefined as PaymentStatus | undefined],
    paymentMethod: [undefined as PaymentMethod | undefined],
    createdDate: [''],
  });

  protected filterFields: FilterFieldConfig[] = [
    {key: 'instituteName', label: 'Institute Name', type: 'text', placeholder: 'Find by institute name', colSpan: 'lg:col-span-2'},
    {key: 'transactionRef', label: 'Transaction Reference', type: 'text', placeholder: 'Find by transaction reference', colSpan: 'lg:col-span-2'},
    {key: 'status', label: 'Status', type: 'select', options: Object.values(PaymentStatus).map(status => ({label: status, value: status})), placeholder: 'Select status'},
    {key: 'paymentMethod', label: 'Payment Method', type: 'select', options: Object.values(PaymentMethod).map(method => ({label: method, value: method})), placeholder: 'Select payment method'},
    {key: 'createdDate', label: 'Created Date', type: 'date', placeholder: 'Select created date'}
  ];

  fetchApiData(pagination:PaginationRequest, filters:MyPaymentFilterRequest): Observable<any> {
    return this.paymentService.myPayments(pagination,filters);
  }

  protected override mapFormToFilter(formValues: Record<string, any>): MyPaymentFilterRequest {
    return {
      instituteName: formValues['instituteName'] || undefined,
      transactionRef: formValues['transactionRef'] || undefined,
      status: formValues['status'] || undefined,
      paymentMethod: formValues['paymentMethod'] || undefined,
      createdDate: formValues['createdDate'] || undefined,
    };
  }

  protected readonly ArrowUpDown = ArrowUpDown;
}
