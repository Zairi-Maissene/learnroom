import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ApiService<Entity> {
  private BASE_URL = 'http://localhost:3000';
  private init = {
    mode: 'cors' as RequestMode,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  constructor(private toastr: ToastrService) {}

  private handleError(error: any) {
    console.error('Error:', error.message);
    this.toastr.error('Error: ' + error.message, 'Error');
    // return throwError(error);
  }

  private makeRequest(url: string, method: string, body?: any) {
    const requestOptions = {
      ...this.init,
      method,
      body: body ? JSON.stringify(body) : undefined,
    };

    return new Observable<Entity>((observer) => {
      fetch(this.BASE_URL + url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            let errorMessage = data.message;
            console.log(errorMessage);
            this.toastr.error(errorMessage, 'Error');
            observer.error(errorMessage);
          } else {
            this.toastr.success('Request successful', 'Success');
            observer.next(data);
            observer.complete();
          }
        })
        .catch((error) => {
          this.handleError(error)
          observer.error(error.message);
        });
    });
  }

  get(url: string)  {
    return this.makeRequest(url, 'GET').pipe();
  }

  post(url: string, body: any) {
    return this.makeRequest(url, 'POST', body).pipe();
  }

  patch(url: string, body: any){
    return this.makeRequest(url, 'PATCH', body).pipe();
  }

  remove(url: string) {
    return this.makeRequest(url, 'DELETE').pipe();
  }
}
