import {Component, input} from '@angular/core';
import {LucideAngularModule} from 'lucide-angular';
import {PageTitleComponent} from '@shared/components/page-title/page-title.component';
import {LoaderOverlayComponent} from '@shared/components/loader-overlay/loader-overlay.component';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-page-layout',
  imports: [
    LucideAngularModule,
    PageTitleComponent,
    LoaderOverlayComponent,
    NgClass
  ],
  templateUrl: './page-layout.component.html',
  styleUrl: './page-layout.component.css'
})
export class PageLayoutComponent {

  headerTitle = input<string>();
  headerDescription = input<string>();
  showBackButton = input<boolean>(false);

  isLoading = input<boolean>(false);
  loaderTitle = input<string>('Loading');
  loaderDescription = input<string>('Please wait...');
}
