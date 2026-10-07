import {Component} from '@angular/core';
import {PageLayoutComponent} from '@core/layouts';
import {PostCreateComponent} from '@features/posts/components/post-create/post-create.component';

@Component({
  selector: 'app-feed',
  imports: [
    PageLayoutComponent,
    PostCreateComponent
  ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent {

}
