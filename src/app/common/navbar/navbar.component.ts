import {Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Student} from '../../models/userModels/student';
import {Teacher} from '../../models/userModels/teacher';
import {Institute} from '../../models/userModels/institute';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    FormsModule,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isProfileDropdownOpen: boolean = false;
  isSearchDropdownOpen: boolean = false;
  isMobileSearchActive:boolean = false;
  user: any;
  searchInput : string | undefined;

  @ViewChild('mobileSearchInput') mobileSearchInput!: ElementRef;

  constructor() {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      switch (parsedUser.role) {
        case 'ROLE_INSTITUTE':
          this.user = parsedUser as Institute;
          break;
        case 'ROLE_TEACHER':
          this.user = parsedUser as Teacher;
          break;
        case 'ROLE_STUDENT':
          this.user = parsedUser as Student;
          break;
        default:
          this.user = null;
      }
    } else {
      this.user = null;
    }
  }

  ngOnInit(): void {
    this.updateBodyScrollClass();
  }

  toggleSearchDropdown(): void {
    this.isSearchDropdownOpen = !this.isSearchDropdownOpen;
  }

  toggleProfileDropdown(): void {
    this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
  }

  activateMobileSearch(): void {
    this.isMobileSearchActive = true;
    this.updateBodyScrollClass();

    setTimeout(() => {
      if (this.mobileSearchInput) {
        this.mobileSearchInput.nativeElement.focus();
      }
    }, 100);
  }

  deactivateMobileSearch(): void {
    this.isMobileSearchActive = false;
    this.updateBodyScrollClass();
  }

  private updateBodyScrollClass(): void {
    if (this.isMobileSearchActive) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }

  onSearchChange(event: Event): void {
    this.searchInput = (event.target as HTMLInputElement).value;

    this.isSearchDropdownOpen = this.searchInput.length > 0;
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent): void {
    if (this.isMobileSearchActive) {
      this.deactivateMobileSearch();
    }

    if (this.isSearchDropdownOpen) {
      this.isSearchDropdownOpen = false;
    }
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {

    const profileButton = document.querySelector('.profile_button');
    const profileMenu = document.querySelector('.profile_menu');

    if (profileButton?.contains(event.target as Node)) {
      return;
    }

    if (profileMenu && !profileMenu.contains(event.target as Node)) {
      this.isProfileDropdownOpen = false;
    }

    const searchField = document.querySelector('.search_field');
    const searchMenu = document.querySelector('.search_menu');

    if (searchField && !searchField.contains(event.target as Node) &&
      searchMenu && !searchMenu.contains(event.target as Node)) {
      this.isSearchDropdownOpen = false;
    }
  }

}
