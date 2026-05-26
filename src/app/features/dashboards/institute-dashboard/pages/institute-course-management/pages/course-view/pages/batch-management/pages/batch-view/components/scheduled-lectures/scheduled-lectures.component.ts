import {Component, inject, OnInit} from '@angular/core';
import {CardShellComponent} from '../../../../../../../../../../../../../shared/ui/card-shell/card-shell.component';
import {MatDialog} from '@angular/material/dialog';
import {ScheduleLecCreateComponent} from '../schedule-lec-create/schedule-lec-create.component';
import {ActivatedRoute} from '@angular/router';
import {AlertService} from '../../../../../../../../../../../../../core/services/alerts/alert.service';

@Component({
  selector: 'app-scheduled-lectures',
  imports: [
    CardShellComponent
  ],
  templateUrl: './scheduled-lectures.component.html',
  styleUrl: './scheduled-lectures.component.css'
})
export class ScheduledLecturesComponent implements OnInit{

  private chapterId!:number;
  private readonly dialog:MatDialog = inject(MatDialog);
  private readonly activatedRoute:ActivatedRoute = inject(ActivatedRoute);
  private readonly alertService:AlertService = inject(AlertService);

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params)=>{
      const chapterIdParam = params.get('chapterId') ?? '';

      const parsedChapterId: number = Number.parseInt(chapterIdParam);
      if (Number.isNaN(parsedChapterId)) {
        this.alertService.triggerErrorAlert('Invalid chapter id passed via route parameters');
        return;
      }
      this.chapterId = parsedChapterId;
    })
  }

  protected openScheduleLecCreateDialog():void{
    this.dialog.open(ScheduleLecCreateComponent,{
      width:'650px',
      data: this.chapterId
    })
  }
}
