import {Component} from '@angular/core';
import {NoContentComponent} from '@shared/components/no-content/no-content.component';

@Component({
  selector: 'app-user-posts',
  imports: [
    NoContentComponent
  ],
  templateUrl: './user-posts.component.html',
  styleUrl: './user-posts.component.css'
})
export class UserPostsComponent {

}
