import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService<Entity> {
  private BASE_URL = 'http://localhost:3000';
  private init = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
  ) {}

  private handleError(error: any) {
    console.error('Error:', error.message);
    this.toastr.error('Error: ' + error.message, 'Error');
    return of(error.message);
  }

  private makeRequest<NewEntity>(
    url: string,
    method: string,
    body?: any,
  ): Observable<NewEntity> {
    const requestOptions = {
      ...this.init,
      body: body ? JSON.stringify(body) : undefined,
    };

    let call: Observable<NewEntity>;

    switch (method) {
      case 'GET':
        call = this.http.get<NewEntity>(this.BASE_URL + url, requestOptions);
        break;
      case 'POST':
        call = this.http.post<NewEntity>(
          this.BASE_URL + url,
          body,
          requestOptions,
        );
        break;
      case 'PATCH':
        call = this.http.patch<NewEntity>(
          this.BASE_URL + url,
          body,
          requestOptions,
        );
        break;
      case 'DELETE':
        call = this.http.delete<NewEntity>(this.BASE_URL + url, requestOptions);
        break;
      default:
        call = this.http.request<NewEntity>(
          method,
          this.BASE_URL + url,
          requestOptions,
        );
        break;
    }

    return call.pipe(
      map((obj) => {
        console.log(obj);
        return obj as NewEntity;
      }),
      catchError((error) => this.handleError(error)),
    );
  }

  get<T>(url: string) {
    return this.makeRequest<T>(url, 'GET').pipe();
  }

  post<T>(url: string, body: any) {
    return this.makeRequest<T>(url, 'POST', body).pipe();
  }

  patch<T>(url: string, body: any) {
    return this.makeRequest<T>(url, 'PATCH', body).pipe();
  }

  remove<T>(url: string) {
    return this.makeRequest<T>(url, 'DELETE').pipe();
  }
}
