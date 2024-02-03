import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
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

  private handleError(error: any, showErrors: boolean) {
    console.error('Error:', error);
    if (showErrors) this.toastr.error('Error: ' + error.error.message?.[0] ?? error.error.message ?? error.message + 'Error');
    return of(error.message);
  }

  private makeRequest<Entity>(
    url: string,
    method: string,
    showErrors: boolean,
    showSuccess: boolean,
    successMessage?: string,
    body?: any,
  ): Observable<Entity> {
    const requestOptions = {
      ...this.init,
      body: body ? JSON.stringify(body) : undefined,
    };

    let call: Observable<Entity>;
    switch (method) {
      case 'GET':
        call = this.http.get<Entity>(this.BASE_URL + url, requestOptions);
        if (successMessage === undefined)
        successMessage = `Fetched ${url.split("/")[1]} successfully`;
        break;
      case 'POST':
        call = this.http.post<Entity>(
          this.BASE_URL + url,
          body,
          requestOptions,
        );
        if (successMessage === undefined)
          successMessage = `Created ${url.split("/")[1]} successfully`;
        break;
      case 'PATCH':
        call = this.http.patch<Entity>(
          this.BASE_URL + url,
          body,
          requestOptions,
        );
        if (successMessage === undefined)
          successMessage = `Updated ${url.split("/")[1]} successfully`;
        break;
      case 'DELETE':
        call = this.http.delete<Entity>(this.BASE_URL + url, requestOptions);
        if (successMessage === undefined)
          successMessage = `Deleted ${url.split("/")[1]} successfully`;
        break;
      default:
        call = this.http.request<Entity>(
          method,
          this.BASE_URL + url,
          requestOptions,
        );
        break;
    }

    return call.pipe(
      map((obj) => {
        const result = obj as Entity & { message: string };

        if (result.message) {
          this.toastr.error(result.message, 'Error');
          return {} as Entity;
        }
        if (showSuccess) this.toastr.success(successMessage, 'Success');
        return obj as Entity;
      }),
      catchError((error) => this.handleError(error, showErrors)),
    );
  }

  get<T>(url: string,successMessage?:string, showSuccess = false, showErrors = true) {
    return this.makeRequest<T>(url, 'GET', showErrors, showSuccess,successMessage).pipe();
  }

  post<T>(url: string, body: any,successMessage?:string, showSuccess = true, showErrors = true) {
    return this.makeRequest<T>(
      url,
      'POST',
      showErrors,
      showSuccess,
      successMessage,
      body,
    ).pipe();
  }

  patch<T>(url: string, body: any,successMessage?:string, showSuccess = true, showErrors = true) {
    return this.makeRequest<T>(
      url,
      'PATCH',
      showErrors,
      showSuccess,
      successMessage,
      body,
    ).pipe();
  }

  remove<T>(url: string,successMessage?:string, showSuccess = true, showErrors = true) {
    return this.makeRequest<T>(url, 'DELETE', showErrors, showSuccess,successMessage).pipe();
  }
}
