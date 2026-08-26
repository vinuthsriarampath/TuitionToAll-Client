import {Component} from '@angular/core';
import {GraduationCap, LucideAngularModule} from "lucide-angular";

@Component({
  selector: 'app-footer',
    imports: [
        LucideAngularModule
    ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  protected readonly GraduationCap = GraduationCap;
}
