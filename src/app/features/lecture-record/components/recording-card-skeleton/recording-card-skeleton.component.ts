import { Component } from '@angular/core';
import {BadgeComponent, CardShellComponent} from "@shared/ui";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-recording-card-skeleton',
    imports: [
        BadgeComponent,
        CardShellComponent,
        DatePipe
    ],
  templateUrl: './recording-card-skeleton.component.html',
  styleUrl: './recording-card-skeleton.component.css'
})
export class RecordingCardSkeletonComponent {

}
