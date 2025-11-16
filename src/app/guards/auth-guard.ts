import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const authGuard = () => {
  const authService = inject(AuthService);
  const routerService = inject(Router);

  // Check if user has valid token in localStorage
  if (authService.isLoggedIn()) {
    return true;
  }

  // No token - redirect to login page
  routerService.navigate(['/login']);
  return false;
}