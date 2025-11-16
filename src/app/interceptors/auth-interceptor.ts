import { HttpInterceptorFn} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';


export const authInterceptor: HttpInterceptorFn = (req, next) => {

  // Get AuthService to access stored token
  const authService = inject(AuthService);
  const token = authService.getToken();

  // Add Authorization header to all requests if user is logged in
  if(token){
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}` // JWT token format
      }
    });
    return next(clonedRequest);
  }
  // No token - send original request (for login/register endpoints)
  return next(req)
}