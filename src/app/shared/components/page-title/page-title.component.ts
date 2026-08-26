import {Component, input} from '@angular/core';
import {ArrowLeft, LucideAngularModule} from "lucide-angular";

@Component({
  selector: 'app-page-title',
    imports: [
        LucideAngularModule
    ],
  templateUrl: './page-title.component.html',
  styleUrl: './page-title.component.css'
})
export class PageTitleComponent {

  protected readonly ArrowLeft = ArrowLeft;
  protected readonly window = globalThis.window;

  title = input.required<string>();
  description = input<string>();
  backButton = input<boolean>(false);
}
