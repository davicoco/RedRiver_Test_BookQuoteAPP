import { Routes } from '@angular/router';
import { BooksComponent } from './components/books/books';

export const routes: Routes = [
    { path: '', redirectTo: '/books', pathMatch: 'full' },
    { path: 'books', component: BooksComponent}
];
