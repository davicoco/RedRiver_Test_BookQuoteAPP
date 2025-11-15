import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';

//redirectar till /login om Token inte finns (checkar efter token)
export const authGuard = () => {
  const authService = inject(AuthService);
  const routerService = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  routerService.navigate(['/login']);
  return false;
}