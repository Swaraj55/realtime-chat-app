import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from '../Auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    const currentUser = this.auth.currentUserValue;
    console.log(currentUser)

    let tokenizedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${currentUser.token}`
      }
    });

    return next.handle(tokenizedRequest);
  }
}
