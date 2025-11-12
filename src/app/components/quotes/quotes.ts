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

  isLoading = false;
  showForm = false;
  editMode = false;

  currentQuote: any = {
    quoteText: '',
    author: ''
  };

  //service injected
  constructor(private quoteService: QuoteService) { }

  ngOnInit() {
    this.loadQuotes();
  }

  loadQuotes() {
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
    this.currentQuote = { quoteText: '', author: '' };
  }

  openEditForm(quote: any) {
    this.showForm = true;
    this.editMode = true;
    this.currentQuote = { ...quote };
  }

  saveQuote() {
    if (this.editMode) {
      this.quoteService.updateQuote(this.currentQuote.id, this.currentQuote).subscribe({
        next: () => {
          this.loadQuotes();
          this.closeForm();
        },
        error: (error) => console.error('Fel vid uppdatering', error)
      });
    } else {
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
