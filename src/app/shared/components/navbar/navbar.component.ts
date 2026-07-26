import {Component, ElementRef, HostListener, inject, OnInit, ViewChild} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {Student} from '@features/profile/dtos/response/student';
import {Teacher} from '@features/profile/dtos/response/teacher';
import {Institute} from '@features/profile/dtos/response/institute';
import {environment} from '@env/environment.development';
import {NavbarSearchComponent} from '@shared/components/navbar-search/navbar-search.component';
import {Bell, House, LayoutDashboard, LucideAngularModule, MessageSquareText, Search, Users} from 'lucide-angular';
import {User} from '@features/profile/dtos/response/user';
import {UserService} from '@features/profile/services/user/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    NavbarSearchComponent,
    LucideAngularModule,
    RouterLinkActive,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  readonly LayoutDashboard = LayoutDashboard;
  readonly MessageSquareText = MessageSquareText
  readonly Bell = Bell;
  readonly Users = Users;
  readonly House = House;
  readonly Search = Search;

  isProfileDropdownOpen: boolean = false;
  isSearchDropdownOpen: boolean = false;
  isMobileSearchActive:boolean = false;
  user: User | null = null;

  private readonly userService:UserService = inject(UserService);

  @ViewChild('mobileSearchInput') mobileSearchInput!: ElementRef;

  ngOnInit(): void {
    this.updateBodyScrollClass();

    this.userService.currentUser$.subscribe(user => {
      this.user = user;
    })
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

  logout() {
    const token: string|null = localStorage.getItem("token");

    if(token){
      localStorage.removeItem("token");
      window.location.replace("/auth/login");
    }
  }

  private isInstitute(details: any): details is Institute {
    return details && 'instituteName' in details;
  }

  private isStudent(details: any): details is Student {
    return details && 'firstName' in details && 'lastName' in details;
  }

  private isTeacher(details: any): details is Teacher {
    return details && 'firstName' in details && 'lastName' in details;
  }

  get displayName(): string {
    const details = this.user?.details;
    if (!details) return '';

    if (this.isInstitute(details)) {
      return details.instituteName || '';
    }

    if (this.isStudent(details) || this.isTeacher(details)) {
      const first = details.firstName || '';
      const last = details.lastName || '';
      return (first + ' ' + last).trim();
    }

    // fallback
    const d = details as any;
    return (
      (d.firstName || d.instituteName || '') + ' ' + (d.lastName || '')
    ).trim();
  }

  protected readonly environment = environment;
}
