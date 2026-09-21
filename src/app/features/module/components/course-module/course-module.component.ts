import {Component, input} from '@angular/core';
import {CardHeaderComponent, CardShellComponent} from '@shared/ui';
import {StudentModuleResponse} from '@features/module/dtos/response/student-module-response';
import {ModuleCardComponent} from '@features/module/components/module-card/module-card.component';
import {NoContentComponent} from '@shared/components/no-content/no-content.component';

@Component({
  selector: 'app-course-module',
  imports: [
    CardShellComponent,
    CardHeaderComponent,
    ModuleCardComponent,
    NoContentComponent
  ],
  templateUrl: './course-module.component.html',
  styleUrl: './course-module.component.css'
})
export class CourseModuleComponent {
  modules = input.required<StudentModuleResponse[]>();

}
