import {Component, inject} from '@angular/core';
import {BreadcrumbService} from '@shared/components/breadcrumb/service/breadcrumb.service';
import {AsyncPipe, NgClass} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  imports: [
    AsyncPipe,
    RouterLink,
    NgClass
  ],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css'
})
export class BreadcrumbComponent {

  protected readonly breadcrumbService = inject(BreadcrumbService);
}
