import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignementService {

  constructor(private http: HttpClient) {}

  getAssignments(id: string): Observable<any> {
    return this.http.get<any>(`/api/assignment/${id}`);
  }
}
