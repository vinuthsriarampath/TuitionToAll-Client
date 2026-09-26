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
import {CurrencyPipe, DatePipe} from '@angular/common';
import {
  PaymentStatusBadgeComponent
} from '@features/payments/components/payment-status-badge/payment-status-badge.component';

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
    MatPaginator
  ],
  templateUrl: './my-payments.component.html',
  styleUrl: './my-payments.component.css'
})
export class MyPaymentsComponent implements OnInit{
  protected loading: boolean = false;

  protected dataSource:MatTableDataSource<PaymentDetailedResponse> = new MatTableDataSource<PaymentDetailedResponse>([]);

  protected pageIndex: number =0;
  protected pageSize: number = 10;
  protected totalElements: number = 0;

  protected displayedColumns: string[] = ['id','institute','amount', 'status', 'paymentMethod', 'createdAt'];

  private readonly paymentService = inject(PaymentService);
  private readonly alertService = inject(AlertService);

  ngOnInit(): void {
        this.loadMyPayments();
  }

  loadMyPayments(): void {
    this.loading = true;

    const pagination = new  PaginationRequest(this.pageIndex, this.pageSize, 'desc', ['created_date']);
    this.paymentService.myPayments(pagination).subscribe({
      next: res => {
        if(res.data){
          this.dataSource.data = res.data ?? [];
          this.pageIndex = res.page ?? 0;
          this.pageSize = res.size ?? 10;
          this.totalElements = res.totalElements ?? 0;
        }
        this.loading = false;
      },
      error: err => {
        this.loading = false;
        this.alertService.triggerErrorAlert(err.error.message ?? 'Failed to load payments');
      }
    })
  }

  onPageChange(event: PageEvent){
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadMyPayments();
  }
}
