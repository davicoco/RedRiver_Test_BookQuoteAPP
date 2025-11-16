import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuoteService } from '../../services/quote';

@Component({
  selector: 'app-quotes',
  imports: [CommonModule, FormsModule],
  templateUrl: './quotes.html',
  styleUrl: './quotes.css',
})
export class QuotesComponent {

  quotes: any[] = [];

  // UI state management
  isLoading = false;
  showForm = false;
  editMode = false;

  // Current quote being created or edited
  currentQuote: any = {
    quoteText: '',
    author: ''
  };

  // Inject QuoteService for API communication
  constructor(private quoteService: QuoteService) { }

  ngOnInit() {
    this.loadQuotes();
  }

  loadQuotes() {
    // Fetch all quotes from API (AuthInterceptor automatically adds JWT token)
    this.isLoading = true;
    this.quoteService.getQuotes().subscribe({
      next: (data) => {
        this.quotes = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Fel vid laddning av citat: ', error);
        this.isLoading = false;
      }
    });
  }

  openAddForm() {
    this.showForm = true;
    this.editMode = false;
    // Reset form for new quote
    this.currentQuote = { quoteText: '', author: '' };
  }

  openEditForm(quote: any) {
    this.showForm = true;
    this.editMode = true;
    // Create copy to avoid mutating original quote object
    this.currentQuote = { ...quote };
  }

  saveQuote() {
    // Handle both create and update operations
    if (this.editMode) {
      // Update existing quote
      this.quoteService.updateQuote(this.currentQuote.id, this.currentQuote).subscribe({
        next: () => {
          this.loadQuotes();
          this.closeForm();
        },
        error: (error) => console.error('Fel vid uppdatering', error)
      });
    } else {
      // Create new quote
      this.quoteService.addQuote(this.currentQuote).subscribe({
        next: () => {
          this.loadQuotes();
          this.closeForm();
        },
        error: (error) => console.error('Fel när man ska lägga till citat', error)
      });
    }
  }

  deleteQuote(id:number){
    // Confirm before deleting to prevent accidental deletion
    if(confirm('Vill du radera detta citat?')){
      this.quoteService.deleteQuote(id).subscribe({
        next: () => this.loadQuotes(),
        error: (error) => console.error('Fel vvid radering', error)
      });
    }
  }

  closeForm() {
    this.showForm = false;
    this.currentQuote = { quoteText: '', author: '' };
  }
}
