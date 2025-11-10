import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book';

@Component({
  selector: 'app-books',
  imports: [CommonModule],
  templateUrl: './books.html',
  styleUrl: './books.css',
})
export class BooksComponent {
  books: any[] = [];
  isloading = false;

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.isloading = true;
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.isloading = false;
      },
      error: (error) => {
        console.error('Error loading books:', error);
        this.isloading=false;
      }
    });
  }
}
