import {Component, ElementRef, input, ViewChild} from '@angular/core';
import {AbstractControl, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-file-input',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './file-input.component.html',
  styleUrl: './file-input.component.css'
})
export class FileInputComponent {

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  control = input.required<AbstractControl | null>();
  id = input.required<string>();
  required = input<boolean>(false);
  label = input.required<string>();
  placeholder = input<string>('');
  accept = input<string>('');
  blockedTypes = input<string[]>([]);

  onFileSelected(event: Event) {
    const inputEl = event.target as HTMLInputElement;

    if (!inputEl.files?.length) return;

    const file = inputEl.files[0];
    const extension = '.' + file.name.split('.').pop()?.toLowerCase();

    if (this.blockedTypes().includes(extension)) {
      this.control()?.setErrors({
        invalidFileType: `Files of type ${extension} are not allowed`
      });

      this.control()?.markAsTouched();

      setTimeout(() => {
        this.fileInput.nativeElement.value = '';
      });

      return;
    }

    // ✅ valid file
    this.control()?.setErrors(null);
    this.control()?.setValue(file);
  }
}
