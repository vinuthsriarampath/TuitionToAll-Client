import {Component, Inject, inject} from '@angular/core';
import {ChapterService} from '../../services/chapter/chapter.service';
import {AlertService} from '../../../../core/services/alerts/alert.service';
import {SelectComponent, SelectOption} from '../../../../shared/ui/select/select.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ChapterStatus} from '../../enums/ChapterStatus';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {DialogLayoutComponent} from '../../../../core/layouts/dialog-layout/dialog-layout.component';
import {InputComponent} from '../../../../shared/ui/input/input.component';
import {BookOpen} from 'lucide-angular';
import {ChapterCreateRequest} from '../../dtos/request/ChapterCreateRequest';
import {FormErrorHandler} from '../../../../shared/utils/helpers/FormErrorHandler';

@Component({
  selector: 'app-chapter-create-dialog',
  imports: [
    DialogLayoutComponent,
    ReactiveFormsModule,
    InputComponent,
    SelectComponent
  ],
  templateUrl: './chapter-create-dialog.component.html',
  styleUrl: './chapter-create-dialog.component.css'
})
export class ChapterCreateDialogComponent{

  protected loading:boolean = false;
  protected form!:FormGroup;

  private readonly moduleId!:number;
  protected readonly chapterStatusOptions:SelectOption[] = []

  private readonly dialogRef:MatDialogRef<ChapterCreateDialogComponent> = inject(MatDialogRef<ChapterCreateDialogComponent>);
  private readonly chapterService:ChapterService = inject(ChapterService);
  private readonly formBuilder:FormBuilder = inject(FormBuilder);
  private readonly alertService = inject(AlertService);
  private readonly formErrorHandler = inject(FormErrorHandler);

  constructor(@Inject(MAT_DIALOG_DATA) private readonly data:number) {
    this.moduleId = data;
    const chapterStatus:ChapterStatus[] = Object.values(ChapterStatus);
    for (let status of chapterStatus){
      this.chapterStatusOptions.push({label:status,value:status})
    }
    this.form = this.initializeForm();
  }

  protected onCancel():void{
    this.dialogRef.close();
  }

  protected initializeForm():FormGroup{
    return this.formBuilder.group({
      title: [null,Validators.required],
      status: [ChapterStatus.DRAFT,Validators.required],
      moduleId:[this.moduleId]
    })
  }

  protected onReset():void{
    this.form = this.initializeForm();
  }

  protected onSubmit():void{
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    const request:ChapterCreateRequest = this.form.value;

    this.triggerLoading();

    this.chapterService.createChapter(request).subscribe({
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
