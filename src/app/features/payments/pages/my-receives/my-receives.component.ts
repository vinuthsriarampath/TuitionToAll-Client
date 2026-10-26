import {Component, inject, OnInit} from '@angular/core';
import {CurrencyPipe, DatePipe, TitleCasePipe} from "@angular/common";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatNoDataRow,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {NoContentComponent} from "@shared/components/no-content/no-content.component";
import {PageLayoutComponent} from "@core/layouts";
import {
    PaymentStatusBadgeComponent
} from "@features/payments/components/payment-status-badge/payment-status-badge.component";
import {PaymentDetailedResponse} from '@features/payments/dtos/responses/payment-detailed-response';
import {PaymentService} from '@features/payments/services/payment-service/payment.service';
import {AlertService} from '@core/services/alerts/alert.service';
import {PaginationRequest} from '@shared/utils/requests/PaginationRequest';
import {BasePaginatedFilterComponent} from '@shared/utils/base/BasePaginatedFilterComponent';
import {MyPaymentReceivesFilterRequest} from '@features/payments/dtos/requests/my-payment-receives-filter-request';
import {Observable} from 'rxjs';
import {MyPaymentFilterRequest} from '@features/payments/dtos/requests/payment-filter-request';
import {NonNullableFormBuilder} from '@angular/forms';
import {PaymentStatus} from '@features/payments/enums/payment-status';
import {PaymentMethod} from '@features/payments/enums/payment-method';
import {FilterFieldConfig} from '@shared/utils/config/filter-config';
import {CardShellComponent} from '@shared/ui';
import {FilterToolbarComponent} from '@shared/components/filter-toolbar/filter-toolbar.component';
import {ArrowUpDown, LucideAngularModule} from 'lucide-angular';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'app-my-receives',
  imports: [
    CurrencyPipe,
    DatePipe,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatTable,
    NoContentComponent,
    PageLayoutComponent,
    PaymentStatusBadgeComponent,
    MatHeaderCellDef,
    MatNoDataRow,
    CardShellComponent,
    FilterToolbarComponent,
    LucideAngularModule,
    MatTooltip,
    TitleCasePipe
  ],
  templateUrl: './my-receives.component.html',
  styleUrl: './my-receives.component.css'
})
export class MyReceivesComponent extends BasePaginatedFilterComponent<PaymentDetailedResponse, MyPaymentReceivesFilterRequest>{
  protected displayedColumns: string[] = ['id','student','amount', 'status', 'paymentMethod', 'createdAt'];
  sortByFields: string[] = ['created_date'];

  private readonly paymentService = inject(PaymentService);
  private readonly fb = inject(NonNullableFormBuilder);

  protected filterForm = this.fb.group({
    studentName: [''],
    transactionRef: [''],
    status: [undefined as PaymentStatus | undefined],
    paymentMethod: [undefined as PaymentMethod | undefined],
    createdDate: [''],
  });

  protected filterFields: FilterFieldConfig[] = [
    {key: 'studentName', label: 'Student Name', type: 'text', placeholder: 'Find by student name', colSpan: 'lg:col-span-2'},
    {key: 'transactionRef', label: 'Transaction Reference', type: 'text', placeholder: 'Find by transaction reference'},
    {key: 'status', label: 'Status', type: 'select', options: Object.values(PaymentStatus).map(status => ({label: status, value: status})), placeholder: 'All Status'},
    {key: 'paymentMethod', label: 'Payment Method', type: 'select', options: Object.values(PaymentMethod).map(method => ({label: method, value: method})), placeholder: 'Any Method'},
    {key: 'createdDate', label: 'Created Date', type: 'date', placeholder: 'Select created date'}
  ];

  fetchApiData(pagination: PaginationRequest, filters: MyPaymentReceivesFilterRequest): Observable<any> {
    return this.paymentService.myReceives(pagination, filters);
  }

  protected override mapFormToFilter(formValues: Record<string, any>): MyPaymentReceivesFilterRequest {
    return {
      studentName: formValues['studentName'] || undefined,
      transactionRef: formValues['transactionRef'] || undefined,
      status: formValues['status'] || undefined,
      paymentMethod: formValues['paymentMethod'] || undefined,
      createdDate: formValues['createdDate'] || undefined,
    };
  }

  protected readonly ArrowUpDown = ArrowUpDown;
}
