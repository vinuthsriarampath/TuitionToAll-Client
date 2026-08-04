import {Component, input} from '@angular/core';
import {CircleSlash, LucideAngularModule} from "lucide-angular";

@Component({
  selector: 'app-no-content',
    imports: [
        LucideAngularModule
    ],
  templateUrl: './no-content.component.html',
  styleUrl: './no-content.component.css'
})
export class NoContentComponent {

  title = input<string>('No Content');
  description = input<string>('Still there are no content to be found!');

  protected readonly CircleSlash = CircleSlash;
}
