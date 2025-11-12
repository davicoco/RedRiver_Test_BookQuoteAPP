import { Routes } from '@angular/router';
import { BooksComponent } from './components/books/books';
import { QuotesComponent } from './components/quotes/quotes';

export const routes: Routes = [
    { path: '', redirectTo: '/books', pathMatch: 'full' },
    { path: 'books', component: BooksComponent },
    { path: 'quotes', component: QuotesComponent}
];
