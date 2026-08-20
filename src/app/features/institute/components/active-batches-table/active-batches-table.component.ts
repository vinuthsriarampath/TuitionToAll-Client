import { Component } from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from '@angular/material/table';
import {ArrowRight, LucideAngularModule, MoreVertical} from 'lucide-angular';
import {BadgeComponent, CardShellComponent} from '@shared/ui';
import {NgOptimizedImage} from '@angular/common';
import {NoContentComponent} from '@shared/components/no-content/no-content.component';
import {MatPaginator, PageEvent} from '@angular/material/paginator';

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
    MatPaginator
  ],
  templateUrl: './active-batches-table.component.html',
  styleUrl: './active-batches-table.component.css'
})
export class ActiveBatchesTableComponent {
  displayedColumns: string[] = ['batch', 'course', 'teacher', 'students', 'startDate', 'status', 'action'];

  protected dataSource: MatTableDataSource<BatchData> = new MatTableDataSource<BatchData>([]);

  protected pageIndex:number = 0;
  protected pageSize:number = 5;
  protected totalElements:number = 0;

  protected getActiveBatches():void {
    this.dataSource.data = [
      { batch: 'January 2026', code: 'BTC-2026-01', course: 'Java Programming', teacher: 'Kasun Perera', avatarInitials: 'KP', studentsCurrent: 42, studentsMax: 50, startDate: '05 Jan 2026', status: 'Active' },
      { batch: 'February 2026', code: 'BTC-2026-02', course: 'Spring Boot', teacher: 'Nimal Fernando', avatarInitials: 'NF', studentsCurrent: 37, studentsMax: 40, startDate: '02 Feb 2026', status: 'Active' }
    ];
  }

  getCapacityPercentage(current: number, max: number): number {
    return Math.round((current / max) * 100);
  }


  protected onPageChange(event:PageEvent):void{
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getActiveBatches();
  }
  protected readonly ArrowRight = ArrowRight;
  protected readonly MoreVertical = MoreVertical;
}
