import { Component } from '@angular/core';
import {GraduationCap, LucideAngularModule, Menu, X} from "lucide-angular";
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    LucideAngularModule,
    NgClass,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  protected menuOpen:boolean = false;

  protected toggleMenu():void {
    this.menuOpen = !this.menuOpen;
  }
  protected readonly GraduationCap = GraduationCap;
  protected readonly Menu = Menu;
  protected readonly X = X;
}
