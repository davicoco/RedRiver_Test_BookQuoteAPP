import { Routes } from '@angular/router';
import { BooksComponent } from './components/books/books';
import { QuotesComponent } from './components/quotes/quotes';

export const routes: Routes = [
    { path: '', redirectTo: '/quotes', pathMatch: 'full' },
    { path: 'quotes', component: QuotesComponent}
];
