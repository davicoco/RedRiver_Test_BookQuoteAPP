import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkMode = new BehaviorSubject<boolean>(false);
  darkMode$ = this.darkMode.asObservable();

  constructor() {
    const savedTheme =localStorage.getItem('theme');
    if (savedTheme === 'dark'){
      this.setDarkMode(true);
    }
  }

  toggleTheme(): void {
    this.setDarkMode(!this.darkMode.value)
  }

  private setDarkMode(isDark: boolean): void {
    this.darkMode.next(isDark);
    const htmlElement = document.documentElement;

    if (isDark) {
      htmlElement.setAttribute('data-bs-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      htmlElement.setAttribute('data-bs-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }

  isDarkMode(): boolean {
    return this.darkMode.value;
  }
}
