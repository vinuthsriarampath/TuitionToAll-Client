import {Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {SearchResponse} from '../../../utils/response/search-response';
import {environment} from '../../../../environment/environment.development';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-navbar-search',
  imports: [
    NgIf,
    NgForOf,
    RouterLink,
  ],
  templateUrl: './navbar-search.component.html',
  styleUrl: './navbar-search.component.css'
})
export class NavbarSearchComponent {
  @Input() isMobileSearchActive = false;
  @Output() isMobileSearchActiveChange = new EventEmitter<boolean>();

  constructor(private readonly http:HttpClient) {}


  isSearchDropdownOpen = false;
  searchInput = '';

  searchResults: SearchResponse| null = null;

  @ViewChild('mobileSearchInput') mobileSearchInput!: ElementRef;

  toggleSearchDropdown() {
    this.isSearchDropdownOpen = !this.isSearchDropdownOpen;
    this.clearSearch();
  }

  deactivateMobileSearch() {
    this.isMobileSearchActiveChange.emit(false);
    this.isSearchDropdownOpen = false;
    this.clearSearch();
  }

  clearSearch() {
    this.searchResults = null;
    this.searchInput = '';
  }

  onSearchChange(event: Event) {
    this.searchInput = (event.target as HTMLInputElement).value;
    this.isSearchDropdownOpen = this.searchInput.length > 0;

    this.http.get<SearchResponse>(`http://localhost:8080/api/v2/search?query=${this.searchInput}`).subscribe({
      next: (res) =>{
        this.searchResults = res;
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.isMobileSearchActive) {
      this.deactivateMobileSearch();
    }
    if (this.isSearchDropdownOpen) {
      this.isSearchDropdownOpen = false;
    }
  }

  protected readonly environment = environment;
}
