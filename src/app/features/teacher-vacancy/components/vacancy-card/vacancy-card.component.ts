import {Component, input} from '@angular/core';
import {QuillEditorComponent} from 'ngx-quill';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {TeacherVacancy} from '../../dtos/response/teacher-vacancy';
import {DatePipe} from '@angular/common';
import {BadgeComponent, CardShellComponent} from '@shared/ui';

@Component({
  selector: 'app-vacancy-card',
  imports: [
    QuillEditorComponent,
    FormsModule,
    RouterLink,
    BadgeComponent,
    CardShellComponent,
    DatePipe
  ],
  templateUrl: './vacancy-card.component.html',
  styleUrl: './vacancy-card.component.css'
})
export class VacancyCardComponent {

  vacancy = input.required<TeacherVacancy>();
}
