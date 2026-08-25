import {Component, input, OnInit} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from '@angular/material/table';
import {ArrowRight, Eye, LucideAngularModule, MoreVertical} from 'lucide-angular';
import {BadgeComponent, CardShellComponent} from '@shared/ui';
import {DatePipe, NgOptimizedImage, TitleCasePipe} from '@angular/common';
import {NoContentComponent} from '@shared/components/no-content/no-content.component';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {BatchDetailedResponse} from '@features/batch/dtos/response/batch-detailed-response';
import {PaginatedApiResponse} from '@shared/utils/response/paginated-api-response';
import {BatchEnrollmentStatus} from '@features/batch/enums/batch-enrollment-status';
import {BatchStatus} from '@features/batch/enums/batch-status';
import {RouterLink} from '@angular/router';

export interface BatchData {
  batch: string;
  code: string;
  course: string;
  teacher: string;
  avatarInitials: string;
  studentsCurrent: number;
  studentsMax: number;
  startDate: string;
  status: 'Active' | 'Pending' | 'Completed';
}

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
    NgOptimizedImage,
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

  protected pageIndex:number = 0;
  protected pageSize:number = 5;
  protected totalElements:number = 0;

  ngOnInit(): void {
      this.pageIndex = this.data().page ?? 0;
      this.pageSize = this.data().size ?? 5;
      this.totalElements = this.data().totalElements ?? 0;

      this.dataSource.data = this.data().data ?? [];
  }

  protected getActiveBatches():void {

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
    this.getActiveBatches();
  }
  protected readonly ArrowRight = ArrowRight;
  protected readonly MoreVertical = MoreVertical;
  protected readonly BatchEnrollmentStatus = BatchEnrollmentStatus;
  protected readonly BatchStatus = BatchStatus;
  protected readonly Eye = Eye;
}
