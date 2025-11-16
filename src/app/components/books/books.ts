import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-books',
  imports: [CommonModule, FormsModule],
  templateUrl: './books.html',
  styleUrl: './books.css',
})
export class BooksComponent {

  books: any[] = [];

  // UI state management
  isLoading = false;
  showForm = false;
  editMode = false;

  // Current book being created or edited
  currentBook: any = {
    title: '',
    author: '',
    genre: '',
    publicationDate: ''
  };

  // Inject BookService for API communication
  constructor(private bookService: BookService) { }

  ngOnInit() {
    // Load books when component initializes
    this.loadBooks();
  }

  loadBooks() {
    // Fetch books from API (AuthInterceptor automatically adds token)
    this.isLoading = true;
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Fel vid laddning av böcker: ', error);
        this.isLoading = false;
      }
    });
  }

  openAddForm() {
    this.showForm = true;
    this.editMode = false;
    // Reset form for new book
    this.currentBook = { title: '', author: '', genre: '', publicationDate: '' };
  }

  openEditForm(book: any) {
    this.showForm = true;
    this.editMode = true;
    // Create copy to avoid mutating original book object
    this.currentBook = { ...book };
  }

  saveBook() {
    // Handle both create and update operations
    if (this.editMode) {
      // Update existing book
      this.bookService.updateBook(this.currentBook.id, this.currentBook).subscribe({
        next: () => {
          this.loadBooks();
          this.closeForm();
        },
        error: (error) => console.error('Fel vid uppdatering', error)
      });
    } else {
      // Create new book
      this.bookService.addBook(this.currentBook).subscribe({
        next: () => {
          this.loadBooks();
          this.closeForm();
        },
        error: (error) => console.error('Fel när man ska lägga till bok', error)
      });
    }
  }

  deleteBook(id: number) {
    // Confirm before deleting to prevent accidental deletion
    if (confirm('Vill du radera denna bok?')) {
      this.bookService.deleteBook(id).subscribe({
        next: () => this.loadBooks(),
        error: (error) => console.error('Fel vid radering', error)
      });
    }
  }

  closeForm() {
    this.showForm = false;
    // Reset form state
    this.currentBook = { title: '', author: '', genre: '', publicationDate: '' };
  }
}
