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

  isLoading = false;
  showForm = false;
  editMode = false;

  currentBook: any = {
    title: '',
    author: '',
    genre: '',
    publicationDate: ''
  };

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
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
    this.currentBook = { title: '', author: '', genre: '', publicationDate: '' };
  }

  openEditForm(book: any) {
    this.showForm = true;
    this.editMode = true;
    this.currentBook = { ...book };
  }

  saveBook() {
    if (this.editMode) {
      this.bookService.updateBook(this.currentBook.id, this.currentBook).subscribe({
        next: () => {
          this.loadBooks();
          this.closeForm();
        },
        error: (error) => console.error('Fel vid uppdatering', error)
      });
    } else {
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
    if (confirm('Vill du radera denna bok?')) {
      this.bookService.deleteBook(id).subscribe({
        next: () => this.loadBooks(),
        error: (error) => console.error('Fel vid radering', error)
      });
    }
  }

  closeForm() {
    this.showForm = false;
    this.currentBook = { title: '', author: '', genre: '', publicationDate: '' };
  }
}
