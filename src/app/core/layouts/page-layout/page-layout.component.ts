import {Component, input} from '@angular/core';
import {LucideAngularModule} from 'lucide-angular';
import {PageTitleComponent} from '../../../shared/components/page-title/page-title.component';

@Component({
  selector: 'app-page-layout',
  imports: [
    LucideAngularModule,
    PageTitleComponent
  ],
  templateUrl: './page-layout.component.html',
  styleUrl: './page-layout.component.css'
})
export class PageLayoutComponent {

  headerTitle = input.required<string>();
  headerDescription = input<string>();
  showBackButton = input<boolean>(false);
}
