import {Component, input} from '@angular/core';
import {QuillEditorComponent} from 'ngx-quill';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {BadgeComponent} from '../../../../shared/ui/badge/badge.component';
import {CardShellComponent} from '../../../../shared/ui/card-shell/card-shell.component';
import {TeacherVacancy} from '../../../teacher-vacancy/dtos/response/teacher-vacancy';
import {DatePipe} from '@angular/common';

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
