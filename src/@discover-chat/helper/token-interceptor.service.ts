import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpInterceptor } from '@angular/common/http';
import { AuthService } from '../Auth/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  currentUser: any;
  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    this.currentUser = this.auth.currentUserValue;
    let tokenizedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.currentUser.token}`
      }
    });

    return next.handle(tokenizedRequest);
  }
}
