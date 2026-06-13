import {Component, input, output} from '@angular/core';
import {LucideAngularModule, LucideIconData, Megaphone} from "lucide-angular";
import {ReactiveFormsModule} from "@angular/forms";
import {NgClass} from '@angular/common';
import {LoaderOverlayComponent} from '@shared/components/loader-overlay/loader-overlay.component';

@Component({
  selector: 'app-dialog-layout',
  imports: [
    LucideAngularModule,
    ReactiveFormsModule,
    NgClass,
    LoaderOverlayComponent
  ],
  templateUrl: './dialog-layout.component.html',
  styleUrl: './dialog-layout.component.css'
})
export class DialogLayoutComponent {

  protected readonly Megaphone = Megaphone;

  loading = input<boolean>(false);
  loaderTitle = input<string>('Loading');
  loaderDescription = input<string>('Please wait...');

  title = input.required<string>();
  description = input.required<string>();

  icon = input.required<LucideIconData>();
  iconColour = input<'info' | 'danger' | 'warning' | 'success'>('info');

  cancelEvent = output<void>();

  protected onCancel():void{
    this.cancelEvent.emit();
  }

}
