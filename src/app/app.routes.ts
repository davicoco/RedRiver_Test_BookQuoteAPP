import { Routes } from '@angular/router';
import { BooksComponent } from './components/books/books';
import { QuotesComponent } from './components/quotes/quotes';
import { LoginComponent } from './components/login/login';
import { RegisterComponent} from './components/register/register';
import { authGuard } from './guards/auth-guard'

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    {
        path:'books',
        component: BooksComponent,
        canActivate: [authGuard]
    },
    {
        path:'quotes',
        component: QuotesComponent,
        canActivate: [authGuard]
    }
];
