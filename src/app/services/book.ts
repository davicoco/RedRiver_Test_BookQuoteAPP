import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'http://localhost:5176/api/books';

  constructor(private http: HttpClient) {}
}
