import {Component, inject, OnInit} from '@angular/core';
import {CardShellComponent, CheckboxComponent, FileInputComponent, InputComponent} from '@shared/ui';
import {LucideAngularModule, Trash2} from 'lucide-angular';
import {PageLayoutComponent} from '@core/layouts';
import {QuillEditorComponent} from 'ngx-quill';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AssignmentConfig} from '@features/assignments/pages/assignment-list/assignment-list.component';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '@core/services/alerts/alert.service';
import {FormErrorHandler} from '@shared/utils/helpers/FormErrorHandler';
import {AssignmentService} from '@features/assignments/services/assignment/assignment.service';
import {AssignmentDetailedResponse} from '@features/assignments/dtos/response/assignment-detailed-response';
import {combineLatest} from 'rxjs';
import {AssignmentUpdateRequest} from '@features/assignments/dtos/request/assignment-update-request';
import {environment} from '@env/environment.development';

@Component({
  selector: 'app-assignment-update',
  imports: [
    CheckboxComponent,
    FileInputComponent,
    InputComponent,
    LucideAngularModule,
    PageLayoutComponent,
    QuillEditorComponent,
    ReactiveFormsModule,
    CardShellComponent
  ],
  templateUrl: './assignment-update.component.html',
  styleUrl: './assignment-update.component.css'
})
export class AssignmentUpdateComponent implements OnInit {
  protected originalAssignment!:AssignmentDetailedResponse;
  protected mainForm!: FormGroup;
  protected fileForm!:FormGroup;
  protected config!: AssignmentConfig;
  protected isFormReady:boolean = false;
  protected loading:boolean = false;

  private readonly window = globalThis.window;
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly router: Router = inject(Router);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly assignmentService:AssignmentService = inject(AssignmentService);
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
    combineLatest([this.activatedRoute.queryParams, this.activatedRoute.paramMap]).subscribe(([queryParams,params]) =>{
      const assignmentIdParam = params.get('assignmentId') ?? '';

      if (!queryParams || Object.keys(queryParams).length === 0 || !assignmentIdParam) {
        this.router.navigate(['/404'], { skipLocationChange: true });
      } else {
        const parsedAssignmentId: number = Number.parseInt(assignmentIdParam);
        if (Number.isNaN(parsedAssignmentId)) {
          this.router.navigate(['/404'], { skipLocationChange: true });
          return;
        }
        this.config = queryParams as AssignmentConfig;
        this.loadAssignmentById(parsedAssignmentId);
      }
    })

  }

  private initializeForm(): FormGroup {
    const gradingRangesControls = (this.originalAssignment.gradingRangers || []).map(range =>
      this.formBuilder.group({
        minMarks: [range.minMarks, Validators.required],
        maxMarks: [range.maxMarks, Validators.required],
        desiredGrade: [range.desiredGrade, [Validators.required, Validators.maxLength(5)]],
        description: [range.description]
      })
    );

    const formConfig: Record<string, any> = {
      topic: [this.originalAssignment.topic, Validators.required],
      description: [this.originalAssignment.description],
      totalMarks: [this.originalAssignment.totalMarks, [Validators.required, Validators.min(1)]],
      availableOn: [ this.originalAssignment.availableOn,Validators.required],
      dueDate: [ this.originalAssignment.dueDate,Validators.required],
      lateSubmission: [this.originalAssignment.lateSubmission],
      resubmission: [this.originalAssignment.resubmission],
      maxAttempts: [this.originalAssignment.maxAttempts,Validators.required],
      gradingRanges: this.formBuilder.array(gradingRangesControls,Validators.required),
    };

    return  this.formBuilder.group(formConfig);

  }

  initializeFileForm():FormGroup{
    return this.formBuilder.group({
      file: [null,Validators.required]
    })
  }

  private loadAssignmentById(id:number){
    this.assignmentService.getDetailedAssignmentById(id).subscribe({
      next: (res) => {
        if (res.data) {
          this.originalAssignment = res.data;
          this.mainForm = this.initializeForm();
          this.fileForm = this.initializeFileForm();
          this.setupFormListeners();
          this.isFormReady = true;
        }
      },
      error: (err) => {
        this.alertService.triggerErrorAlert(err.error?.message);
      }
    });
  }

  private setupFormListeners(): void {
    const resubmission = this.mainForm.get('resubmission');
    const maxAttempts = this.mainForm.get('maxAttempts');

    resubmission?.valueChanges.subscribe(value => {

      if (value) {
        maxAttempts?.setValue(this.originalAssignment.maxAttempts, { emitEvent: false });
      } else {
        maxAttempts?.setValue(1, { emitEvent: false });
      }
    });
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
    const raw = this.mainForm.getRawValue();
    this.triggerLoading();

    const request: AssignmentUpdateRequest = {...raw};

    this.assignmentService.updateAssignment(this.originalAssignment.id, request).subscribe({
      next: (res) => {
        if (res.data) {
          this.triggerLoading();
          this.alertService.triggerSuccessAlert("Assignment Details Update Successfully!");
          this.window.history.back();
        }
      },
      error: (err) => {
        this.formErrorHandler.normalizeErrors(err);
        this.formErrorHandler.handle(err, this.mainForm, () => this.triggerLoading());
      }
    });

  }

  onFileSubmit():void{
    if(this.fileForm.invalid){
      return;
    }
    let file:File | null = this.fileForm.get('file')?.value ?? null;
    if (file === null || !(file instanceof File)) {
      this.alertService.triggerErrorAlert("File is missing or invalid!");
      return;
    }
    this.assignmentService.updateAssignmentFile(this.originalAssignment.id,file).subscribe({
      next: (res) => {
        if (res.data) {
          this.alertService.triggerSuccessAlert("File updated successfully!");
          this.originalAssignment.fileName = res.data
          this.fileForm.reset();
        }
      },
      error: (err) => {
        this.alertService.triggerErrorAlert(err.error?.message || "Failed to update file!");
      }
    });
  }

  protected onReset() {
    this.mainForm = this.initializeForm();
  }

  private triggerLoading():void{
    this.loading = !this.loading;

    if(this.loading){
      this.mainForm.disable({ emitEvent :true})
      this.fileForm.disable({ emitEvent :true})
    }else {
      this.mainForm.enable();
      this.fileForm.enable();
    }
  }

  protected readonly Trash2 = Trash2;
  protected readonly environment = environment;
}
