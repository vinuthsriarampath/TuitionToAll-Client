import { Component, input, output } from '@angular/core';
import {LucideAngularModule, Search} from 'lucide-angular';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-conversation-search',
  imports: [LucideAngularModule, FormsModule],
  templateUrl: './conversation-search.component.html',
  styleUrl: './conversation-search.component.css'
})
export class ConversationSearchComponent {
  searchTerm = input<string>('');

  searchTermChange = output<string>();

  protected onSearch(value: string): void {
    this.searchTermChange.emit(value);
  }

  protected readonly Search = Search;
}
