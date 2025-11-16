import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';

interface RegisterDto {
  username: string;
  email: string;
  password: string;
}

interface LoginDto {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'https://redriver-test-bookquoteapi.onrender.com/auth';

  // Observable for tracking authentication status across the app
  // Initialized with current token state from localStorage
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  register(registerDto: RegisterDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, registerDto)
      .pipe(
        tap(response => {
          // Store JWT token in localStorage for persistence
          this.saveToken(response.token);
          // Notify all subscribers that user is now authenticated 
          this.isAuthenticatedSubject.next(true); 
        })
      );
  }

  login(loginDto: LoginDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, loginDto)
      .pipe(
        tap(response => {
          this.saveToken(response.token);
          this.isAuthenticatedSubject.next(true);
        })
      );
  }

  logout(): void {
    // Remove token from localStorage
    localStorage.removeItem('token'); 
    // Update authentication state
    this.isAuthenticatedSubject.next(false) 
    // Redirect to login page
    this.router.navigate(['/login']) 
  }

  // Store JWT token in browser's localStorage
  private saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Retrieve JWT token from localStorage (used by AuthInterceptor)
  getToken(): string | null {
    return localStorage.getItem('token')
  }

  // Check if token exists (!! converts to boolean)
  private hasToken(): boolean {
    return !!this.getToken();
  }

  // Public method to check authentication status
  isLoggedIn(): boolean {
    return this.hasToken();
  }
}