import {Component, input} from '@angular/core';
import {BadgeComponent, CardShellComponent} from '@shared/ui';
import {NgOptimizedImage, TitleCasePipe} from '@angular/common';
import {environment} from '@env/environment.development';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-user-card',
  imports: [
    CardShellComponent,
    NgOptimizedImage,
    BadgeComponent,
    TitleCasePipe,
    RouterLink
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  dp = input.required<string>();
  displayName = input.required<string>();
  userSlug = input.required<string>();
  email = input.required<string>();
  role = input.required<string>();
  protected readonly environment = environment;
}
