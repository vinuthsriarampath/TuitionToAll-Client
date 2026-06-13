import {Component, inject, input, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatTooltip} from "@angular/material/tooltip";
import {Assignment} from '@features/assignments/dtos/response/assignment';
import {ModuleService} from '@features/module/services/module/module.service';
import {ChapterService} from '@features/chapter/services/chapter/chapter.service';
import {AlertService} from '@core/services/alerts/alert.service';
import {Eye, LucideAngularModule, Pencil, RefreshCw} from 'lucide-angular';
import {ActivatedRoute, Router} from '@angular/router';

export type AssignmentConfig =
  | { type: 'module'; moduleId: number; chapterId?: never }
  | { type: 'chapter'; chapterId: number; moduleId?: never };

export type Header = {
  title: string,
  description: string
}

@Component({
  selector: 'app-assignment-list',
  imports: [
    DatePipe,
    LucideAngularModule,
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
    MatTooltip,
    MatHeaderCellDef
  ],
  templateUrl: './assignment-list.component.html',
  styleUrl: './assignment-list.component.css'
})
export class AssignmentListComponent implements OnInit {

  header= input.required<Header>();
  config = input.required<AssignmentConfig>();

  protected columns: string[] = ['id', 'topic', 'availableDate', 'dueDate', 'createdDate', 'actions'];
  protected dataSource: MatTableDataSource<Assignment> = new MatTableDataSource<Assignment>();

  protected pageIndex = 0;
  protected pageSize = 10;
  protected totalElements = 0;

  private readonly moduleService: ModuleService = inject(ModuleService);
  private readonly chapterService: ChapterService = inject(ChapterService);
  private readonly alertService: AlertService = inject(AlertService);
  private readonly router: Router = inject(Router);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.loadAssignments();
  }

  protected loadAssignments() {
    const currentConfig = this.config();

    const assignmentObservable$ = currentConfig.type === 'module'
      ? this.moduleService.getAssignmentsByModule(currentConfig.moduleId,this.pageIndex,this.pageSize)
      : this.chapterService.getAllChapterAssignmentsWithFilters(currentConfig.chapterId,this.pageIndex,this.pageSize);

    assignmentObservable$.subscribe({
      next: (res) => {
        if (res.data) {
          this.dataSource.data = res.data;
          this.pageIndex = res.page ?? 0;
          this.pageSize = res.size ?? 10;
          this.totalElements = res.totalElements ?? 0;
        }
      },
      error: (err) => {
        this.alertService.triggerErrorAlert(err.error?.message || 'Failed to load assignments');
      }
    });
  }


  protected onPageChange($event: PageEvent) {
    this.pageIndex = $event.pageIndex;
    this.pageSize = $event.pageSize;
    this.loadAssignments();
  }

  protected onRefresh():void{
    this.loadAssignments();
  }

  protected navigateToAssignmentCreate():void{
    this.router.navigate(
      ['assignments','create'],
      { relativeTo: this.activatedRoute ,queryParams: this.config() }
    );
  }
  protected readonly RefreshCw = RefreshCw;
  protected readonly Eye = Eye;
  protected readonly Pencil = Pencil;
}
