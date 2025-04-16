import {Component, HostListener} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {User} from '../../models/userModels/user';
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

  toggleProfileDropdown() {
    this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
  }

  toggleMobileSearch() {
    this.isMobileSearchActive = true;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    const dropdowns = [
      { isOpen: this.isProfileDropdownOpen, buttonClass: '.profile_button', menuClass: '.profile_menu' },
      { isOpen: this.isSearchDropdownOpen, buttonClass: '.search_field', menuClass: '.search_menu' }
    ];

    dropdowns.forEach(dropdown => {
      const dropdownButton = document.querySelector(dropdown.buttonClass);
      const dropdownMenu = document.querySelector(dropdown.menuClass);

      if (
        dropdown.isOpen &&
        dropdownButton &&
        dropdownMenu &&
        !dropdownButton.contains(target) &&
        !dropdownMenu.contains(target)
      ) {
        this.closeAllDropdowns();
      }
    });
  }
  closeAllDropdowns(){
    this.isProfileDropdownOpen = false;
    this.isSearchDropdownOpen = false;
  }

  toggleSearchDropdown() {
    this.isSearchDropdownOpen = !this.isSearchDropdownOpen;
  }

  onSearchChange(event: Event): void {
    this.searchInput = (event.target as HTMLInputElement).value;
    console.log('Search input changed:', this.searchInput);
  }
}
