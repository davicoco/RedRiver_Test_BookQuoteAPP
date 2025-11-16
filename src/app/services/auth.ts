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

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  register(registerDto: RegisterDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, registerDto)
      .pipe(
        tap(response => {
          //sparar token i localStorage
          this.saveToken(response.token);
          //säger till appen att användare är inloggad 
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
    //raderar token
    localStorage.removeItem('token'); 
    //loggar ut användare 
    this.isAuthenticatedSubject.next(false) 
    //redirectar till '/login'
    this.router.navigate(['/login']) 
  }

  //sparar token
  private saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  //hämtar token från localstorage
  getToken(): string | null {
    return localStorage.getItem('token')
  }

  //verifierar att man har token (måste få ett värde)
  private hasToken(): boolean {
    return !!this.getToken();
  }

  //kollar så man är inloggad
  isLoggedIn(): boolean {
    return this.hasToken();
  }
}