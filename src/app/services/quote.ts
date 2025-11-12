import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  private apiUrl = 'http://localhost:5176/api/quotes';

  constructor(private http: HttpClient) { }

  getQuotes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl)
  }

  addQuote(quote: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, quote)
  }

  updateQuote(id: number, quote: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, quote);
  }

  deleteQuote(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`)
  }
}
