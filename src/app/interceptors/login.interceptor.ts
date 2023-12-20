import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LoginInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    // const token = localStorage.getItem('user')
    // if (token) {
    //   const cloneReq = request.clone(
    //     { setHeaders: {
    //     Authorization: `Bearer ${token}`
    //   }}
    //   )
    //   return next.handle(cloneReq);
    // } else {
    return next.handle(request);
    // }
  }
}

export const loginInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: LoginInterceptor,
  multi: true,
};
