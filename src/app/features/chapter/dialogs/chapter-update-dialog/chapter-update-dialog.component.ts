import {Component, inject, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ChapterResponse} from '../../dtos/response/ChapterResponse';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ChapterService} from '../../services/chapter/chapter.service';
import {AlertService} from '@core/services/alerts/alert.service';
import {ChapterStatus} from '../../enums/ChapterStatus';
import {ChapterDetailsUpdateRequest} from '../../dtos/request/ChapterDetailsUpdateRequest';
import {FormErrorHandler} from '@shared/utils/helpers/FormErrorHandler';
import {BookOpen} from 'lucide-angular';
import {DialogLayoutComponent} from '@core/layouts';
import {InputComponent, SelectComponent, SelectOption} from '@shared/ui';

@Component({
  selector: 'app-chapter-update-dialog',
  imports: [
    InputComponent,
    SelectComponent,
    ReactiveFormsModule,
    DialogLayoutComponent
  ],
  templateUrl: './chapter-update-dialog.component.html',
  styleUrl: './chapter-update-dialog.component.css'
})
export class ChapterUpdateDialogComponent {

  protected loading:boolean = false;
  protected form!:FormGroup

  protected readonly chapterStatusOptions:SelectOption[] = []

  private readonly originalChapter!:ChapterResponse;

  protected readonly dialogRef:MatDialogRef<ChapterUpdateDialogComponent> = inject(MatDialogRef<ChapterUpdateDialogComponent>);
  protected readonly chapterService:ChapterService = inject(ChapterService);
  protected readonly alertService:AlertService = inject(AlertService);
  protected readonly formBuilder:FormBuilder = inject(FormBuilder);
  protected readonly formErrorHandler:FormErrorHandler = inject(FormErrorHandler);

  constructor(@Inject(MAT_DIALOG_DATA) private readonly data:ChapterResponse) {
    this.originalChapter = data;
    const chapterStatus:ChapterStatus[] = Object.values(ChapterStatus);
    for (let status of chapterStatus){
      this.chapterStatusOptions.push({label:status,value:status})
    }
    this.form = this.initializeForm();
  }

  protected initializeForm():FormGroup{
    return this.formBuilder.group({
      title: [this.originalChapter.title,[Validators.required]],
      status: [this.originalChapter.status,[Validators.required]],
      moduleId: [this.originalChapter.moduleId,[Validators.required]]
    })
  }

  protected onCancel():void{
    this.dialogRef.close();
  }

  protected onReset():void{
    this.form = this.initializeForm();
  }

  protected onSubmit():void{
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    const request:ChapterDetailsUpdateRequest = this.form.value;

    this.triggerLoading();

    this.chapterService.updateChapterDetails(this.originalChapter.id,request).subscribe({
      next: (res)=>{
        this.triggerLoading();
        this.alertService.triggerSuccessAlert(res.message);
        this.dialogRef.close(true);
      },
      error: (err)=>{
        this.formErrorHandler.handle(err,this.form,()=> this.triggerLoading());
      }
    })
  }

  protected triggerLoading():void{
    this.loading = !this.loading;

    if(this.loading){
      this.form.disable({emitEvent:false})
    }else{
      this.form.enable();
    }
  }

  protected readonly BookOpen = BookOpen;
}
