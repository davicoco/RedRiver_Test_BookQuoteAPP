import { HttpInterceptorFn} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';

// lägger till header (token) till httprequests
export const authInterceptor: HttpInterceptorFn = (req, next) => {

  //instans av authService
  const authService = inject(AuthService);
  //hämtar token från localstorage
  const token = authService.getToken();


  if(token){
    //klonar token om den finns (för att kunna modifiera/lägga till token)
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    //skickar httpförfrågan med token (modifierad och klonad)
    return next(clonedRequest);
  }
  //skickar original förfrågan vid tex login/register
  return next(req)
}