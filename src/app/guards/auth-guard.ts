import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';

//redirectar till /login om Token inte finns (checkar efter token)
export const authGuard = () => {

  //instanser av servicer
  const authService = inject(AuthService);
  const routerService = inject(Router);

  //kollar om användare är inloggad
  if (authService.isLoggedIn()) {
    return true;
  }

  //redirectar till inloggningssida om man inte längre är inloggad
  routerService.navigate(['/login']);
  return false;
}