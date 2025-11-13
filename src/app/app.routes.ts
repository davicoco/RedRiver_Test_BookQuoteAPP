import { Routes } from '@angular/router';
import { BooksComponent } from './components/books/books';
import { QuotesComponent } from './components/quotes/quotes';
import { LoginComponent } from './components/login/login';
import { RegisterComponent} from './components/register/register';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'books', component: BooksComponent },
    { path: 'quotes', component: QuotesComponent}
];
