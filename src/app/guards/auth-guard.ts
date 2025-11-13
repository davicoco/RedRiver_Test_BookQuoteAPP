import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const authGuard = () => {
  const authService = inject(AuthService);
  const routerService = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  routerService.navigate(['/login']);
  return false;
}