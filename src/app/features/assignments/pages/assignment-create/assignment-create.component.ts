import {Component, inject, OnInit} from '@angular/core';
import {AssignmentConfig} from '@features/assignments/pages/assignment-list/assignment-list.component';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CheckboxComponent, FileInputComponent, InputComponent} from '@shared/ui';
import {QuillEditorComponent} from 'ngx-quill';
import {getDateTime} from '@shared/utils/helpers/date-helper';
import {isFutureDate, isPresentFutureDate} from '@shared/utils/validators/form-custom-validators';
import {PageLayoutComponent} from '@core/layouts';
import {
  ChapterAssignmentCreateRequest
} from '@features/assignments/dtos/request/chapter-assignment/chapter-assignment-create-request';
import {
  ModuleAssignmentCreateRequest
} from '@features/assignments/dtos/request/module-assignment/module-assignment-create-request';
import {ChapterAssignmentService} from '@features/assignments/services/chapter-assignment/chapter-assignment.service';
import {ModuleAssignmentService} from '@features/assignments/services/module-assignment/module-assignment.service';
import {AlertService} from '@core/services/alerts/alert.service';
import {FormErrorHandler} from '@shared/utils/helpers/FormErrorHandler';
import {LucideAngularModule, Trash2} from 'lucide-angular';

@Component({
  selector: 'app-assignment-create',
  imports: [
    ReactiveFormsModule,
    InputComponent,
    QuillEditorComponent,
    CheckboxComponent,
    PageLayoutComponent,
    FileInputComponent,
    LucideAngularModule,
  ],
  templateUrl: './assignment-create.component.html',
  styleUrl: './assignment-create.component.css'
})
export class AssignmentCreateComponent implements OnInit{
  protected mainForm!: FormGroup;
  protected config!: AssignmentConfig;
  protected isFormReady:boolean = false;
  protected loading:boolean = false;

  private readonly window = globalThis.window;
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly router: Router = inject(Router);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly chapterAssignmentService:ChapterAssignmentService = inject(ChapterAssignmentService);
  private readonly moduleAssignmentService:ModuleAssignmentService = inject(ModuleAssignmentService);
  private readonly alertService:AlertService = inject(AlertService);
  private readonly formErrorHandler:FormErrorHandler = inject(FormErrorHandler);

  protected modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
      ['clean'],
    ]
  };

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (!params || Object.keys(params).length === 0) {
        this.router.navigate(['/404'], { skipLocationChange: true });
      } else {
        this.config = params as AssignmentConfig;
        this.mainForm = this.initializeForm();
        this.isFormReady = true;
      }
    });
  }

  private initializeForm(): FormGroup {
    const defaultMaxMarks = 100;

    const formConfig: Record<string, any> = {
      topic: ['', Validators.required],
      description: [''],
      totalMarks: [defaultMaxMarks, [Validators.required, Validators.min(1)]],
      availableOn: [ getDateTime(),[Validators.required, isPresentFutureDate()]],
      dueDate: [getDateTime(0,0,1,0,0),[Validators.required, isFutureDate()]],
      lateSubmission: [false],
      reSubmission: [false],
      maxAttempts: [1,Validators.required],
      file: [],
      gradingRanges: this.formBuilder.array([],Validators.required),
    };

    if (this.config?.type === 'module') {
      formConfig['moduleId'] = [this.config.moduleId];
    } else if (this.config?.type === 'chapter') {
      formConfig['chapterId'] = [this.config.chapterId];
    }

    const group = this.formBuilder.group(formConfig);

    const gradingRanges = group.get('gradingRanges') as FormArray;
    gradingRanges.push(this.createRowWithContext(group, defaultMaxMarks));

    return group;
  }

  get gradingRangesFormArray(): FormArray {
    return this.mainForm.get('gradingRanges') as FormArray;
  }

  private createRowWithContext(parentForm: FormGroup, fallbackMax: number): FormGroup {
    return this.formBuilder.group({
      minMarks: [this.calculateMinMarkWithContext(parentForm), Validators.required],
      maxMarks: [parentForm?.get('totalMarks')?.value ?? fallbackMax, Validators.required],
      desiredGrade: ['',[Validators.required, Validators.maxLength(5)]],
      description: ['']
    });
  }

  private createRow(): FormGroup {
    return this.createRowWithContext(this.mainForm, 100);
  }

  private calculateMinMarkWithContext(parentForm: FormGroup): number {
    if (!parentForm) return 0;
    const gradingRanges = parentForm.get('gradingRanges') as FormArray;
    if (!gradingRanges || gradingRanges.length === 0) return 0;

    const lastItem = gradingRanges.at(- 1).value;
    return (Number(lastItem.maxMarks) || 0) + 1;
  }

  protected addRow(): void {
    this.gradingRangesFormArray.push(this.createRow());
  }

  protected removeRow(index: number): void {
    if (this.gradingRangesFormArray.length > 1) {
      this.gradingRangesFormArray.removeAt(index);
    }
  }

  protected onSubmit(): void {
    if (this.mainForm.invalid) {
      return;
    }

    let file:File | null = this.mainForm.get('file')?.value ?? null;
    if (file === null || !(file instanceof File)) {
      this.alertService.triggerErrorAlert("File is missing or invalid!");
      return;
    }

       if(this.config.type === 'module'){
          let request:ModuleAssignmentCreateRequest= {
            moduleId: this.mainForm.get('moduleId')?.value,
            topic : this.mainForm.get('topic')?.value,
            description:this.mainForm.get('description')?.value,
            totalMarks: this.mainForm.get('totalMarks')?.value,
            availableOn: this.mainForm.get('availableOn')?.value,
            dueDate: this.mainForm.get('dueDate')?.value,
            lateSubmission: this.mainForm.get('lateSubmission')?.value,
            resubmission: this.mainForm.get('reSubmission')?.value,
            maxAttempts: this.mainForm.get('maxAttempts')?.value,
            gradingRanges: this.mainForm.get('gradingRanges')?.value
          }
          this.createModuleAssignment(request,file);
        }else{
          let request:ChapterAssignmentCreateRequest ={
            chapterId: this.mainForm.get('chapterId')?.value,
            topic : this.mainForm.get('topic')?.value,
            description:this.mainForm.get('description')?.value,
            totalMarks: this.mainForm.get('totalMarks')?.value,
            availableOn: this.mainForm.get('availableOn')?.value,
            dueDate: this.mainForm.get('dueDate')?.value,
            lateSubmission: this.mainForm.get('lateSubmission')?.value,
            resubmission: this.mainForm.get('reSubmission')?.value,
            maxAttempts: this.mainForm.get('maxAttempts')?.value,
            gradingRanges: this.mainForm.get('gradingRanges')?.value
          }
          this.createChapterAssignment(request,file);
        }


  }

  private createModuleAssignment(request:ModuleAssignmentCreateRequest, file:File):void{
    this.triggerLoading();
    this.moduleAssignmentService.createModuleAssignment(request,file).subscribe({
      next: (res)=>{
        if(res.data){
          this.alertService.triggerSuccessAlert("Module assignment created successfully");
          this.triggerLoading();
        }
      },
      error: (err) => {
        this.formErrorHandler.normalizeErrors(err);
        this.formErrorHandler.handle(err,this.mainForm,()=>{this.triggerLoading()})
      }
    });
  }

  private createChapterAssignment(request:ChapterAssignmentCreateRequest,file:File):void{

    this.triggerLoading();
    this.chapterAssignmentService.createChapterAssignment(request,file).subscribe({
      next: (res)=>{
        if(res.data){
          this.alertService.triggerSuccessAlert("Chapter assignment created successfully");
          this.triggerLoading();
        }
      },
      error: (err) =>{
        this.formErrorHandler.normalizeErrors(err);
        this.formErrorHandler.handle(err,this.mainForm,()=>{this.triggerLoading()})
      }
    })
  }

  protected onReset() {
    this.mainForm = this.initializeForm();
  }

  private triggerLoading():void{
    this.loading = !this.loading;

    if(this.loading){
      this.mainForm.disable({ emitEvent :true})
    }else {
      this.mainForm.enable();
    }
  }

  protected readonly Trash2 = Trash2;
}
