import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  input,
  Input, output,
  Output, signal,
  ViewChild
} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SearchResponse} from '../../utils/response/search-response';
import {environment} from '@env/environment.development';
import {RouterLink} from '@angular/router';
import {ArrowLeft, LucideAngularModule, Search} from 'lucide-angular';
import {AlertService} from '@core/services/alerts/alert.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-navbar-search',
  imports: [
    RouterLink,
    LucideAngularModule,
    FormsModule,
  ],
  templateUrl: './navbar-search.component.html',
  styleUrl: './navbar-search.component.css'
})
export class NavbarSearchComponent {
  isMobileSearchActive = input<boolean>(false);
  isMobileSearchActiveChange = output<boolean>();

  private readonly http:HttpClient = inject(HttpClient);
  private readonly alertService = inject(AlertService);
  private readonly elementRef = inject(ElementRef);

  protected loading = signal<boolean>(false);

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

    this.loading.set(true);

    this.http.get<SearchResponse>(`http://localhost:8080/api/v2/search?query=${this.searchInput}`).subscribe({
      next: (res) =>{
        this.searchResults = res;
        this.loading.set(false);
      },
      error: (err)=>{
        this.alertService.triggerErrorAlert(err.error.message ?? 'An error occurred while searching.');
        this.loading.set(false);
      }
    })
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.isMobileSearchActive()) {
      this.deactivateMobileSearch();
    }
    if (this.isSearchDropdownOpen) {
      this.isSearchDropdownOpen = false;
      this.clearSearch();
    }
  }

  // Handle click outside to clear and close dropdown
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isSearchDropdownOpen = false;
      this.clearSearch();
      if (this.isMobileSearchActive()) {
        this.deactivateMobileSearch();
      }
    }
  }

  // Handle clicking a result item directly
  onResultClick() {
    this.isSearchDropdownOpen = false;
    this.clearSearch();
    if (this.isMobileSearchActive()) {
      this.deactivateMobileSearch();
    }
  }

  protected readonly environment = environment;
  protected readonly Search = Search;
  protected readonly ArrowLeft = ArrowLeft;
}
