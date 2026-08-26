import {Component, inject, input, OnInit} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from '@angular/material/table';
import {ArrowRight, Eye, LucideAngularModule} from 'lucide-angular';
import {BadgeComponent, CardShellComponent} from '@shared/ui';
import {DatePipe, TitleCasePipe} from '@angular/common';
import {NoContentComponent} from '@shared/components/no-content/no-content.component';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {BatchDetailedResponse} from '@features/batch/dtos/response/batch-detailed-response';
import {PaginatedApiResponse} from '@shared/utils/response/paginated-api-response';
import {BatchEnrollmentStatus} from '@features/batch/enums/batch-enrollment-status';
import {BatchStatus} from '@features/batch/enums/batch-status';
import {RouterLink} from '@angular/router';
import {BatchService} from '@features/batch/services/batch/batch.service';
import {PaginationRequest} from '@shared/utils/requests/PaginationRequest';
import {BatchFilterRequest} from '@features/batch/dtos/request/batch-filter-request';
import {UserService} from '@features/user/services/user/user.service';
import {AlertService} from '@core/services/alerts/alert.service';

@Component({
  selector: 'app-active-batches-table',
  imports: [
    MatTable,
    LucideAngularModule,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCellDef,
    MatCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    CardShellComponent,
    BadgeComponent,
    MatNoDataRow,
    NoContentComponent,
    MatPaginator,
    DatePipe,
    TitleCasePipe,
    RouterLink
  ],
  templateUrl: './active-batches-table.component.html',
  styleUrl: './active-batches-table.component.css'
})
export class ActiveBatchesTableComponent implements OnInit{
  data = input.required<PaginatedApiResponse<BatchDetailedResponse>>();
  displayedColumns: string[] = ['batch', 'course', 'seats', 'startDateAndTime', 'status','enrollmentStatus', 'action'];

  protected dataSource: MatTableDataSource<BatchDetailedResponse> = new MatTableDataSource<BatchDetailedResponse>([]);

  private readonly batchService = inject(BatchService);
  private readonly userService = inject(UserService);
  private readonly alertService = inject(AlertService);

  protected pageIndex:number = 0;
  protected pageSize:number = 5;
  protected totalElements:number = 0;

  ngOnInit(): void {
      this.pageIndex = this.data().page ?? 0;
      this.pageSize = this.data().size ?? 5;
      this.totalElements = this.data().totalElements ?? 0;

      this.dataSource.data = this.data().data ?? [];
  }

  protected getOngoingBatches():void {
    const pagination = new PaginationRequest(this.pageIndex, this.pageSize);
    const filters = new BatchFilterRequest();
    filters.status = BatchStatus.ONGOING;
    filters.instituteId = this.userService.getCurrentUser().details.id ?? -1;
    this.batchService.getDetailedBatches(pagination,filters).subscribe({
      next: (res) =>{
        if(res.data){
          this.dataSource.data = res.data ?? [];
          this.pageIndex = res.page ?? 0;
          this.pageSize = res.size ?? 5;
          this.totalElements = res.totalElements ?? 0;
        }
      },
      error: () => {
        this.alertService.triggerErrorAlert('Failed to change pages.');
      }
    });
  }


  protected formatTimeString(timeStr: string): string {
    if (!timeStr) return '';
    const [hours, minutes] = timeStr.split(':');
    const date = new Date();
    date.setHours(+hours, +minutes);
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  }

  protected getCapacityPercentage(current: number, max: number): number {
    return Math.round((current / max) * 100);
  }

  protected onPageChange(event:PageEvent):void{
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getOngoingBatches();
  }

  protected readonly ArrowRight = ArrowRight;
  protected readonly BatchEnrollmentStatus = BatchEnrollmentStatus;
  protected readonly BatchStatus = BatchStatus;
  protected readonly Eye = Eye;
}
