import {Component} from '@angular/core';
import {CircleX, LucideAngularModule} from 'lucide-angular';

@Component({
  selector: 'app-deleted-message',
  imports: [
    LucideAngularModule
  ],
  templateUrl: './deleted-message.component.html',
  styleUrl: './deleted-message.component.css'
})
export class DeletedMessageComponent {
  protected readonly CircleX = CircleX;
}
