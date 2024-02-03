import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {
  Assignement,
  CreateAssignement,
  CreateResponseAssignement,
  ResponseAssignement,
  UpdateAssignement,
  ValidateResponseAssignement
} from "@core/models/assignment.model";
import {ApiService} from "@core/services/api.service";

@Injectable({
  providedIn: 'root',
})
export class AssignementService {
  constructor(private api: ApiService) {}
  // Assignment
  addAssignement(course_id: string, assignement: CreateAssignement) {
    return this.api.post<Assignement>(`/assignment/${course_id}`, assignement).subscribe();
  }
  getAssignment(id: string): Observable<Assignement> {
    return this.api.get<Assignement>(`/assignment/${id}`)
  }
  updateAssignment(id: string, assignement: UpdateAssignement) {
    return this.api.patch<Assignement>(`/assignment/${id}`, assignement)
      .subscribe();
  }
  deleteAssignment(id: string) {
    console.log(id);
    return this.api.remove(`/assignment/${id}`).subscribe();
  }

  // ResponseAssignment

  getResponseAssignment(assignment_id: string): Observable<ResponseAssignement>  {
    return this.api.get<ResponseAssignement>(
      `/response-assignment/${assignment_id}`,
    );
  }
  getAssignmentResponses(assignment_id: string): Observable<ResponseAssignement[]>  {
    return this.api.get<ResponseAssignement[]>(
      `/response-assignment/all/${assignment_id}`,
    );
  }

  createResponseAssignment(assignmentId: string, response: CreateResponseAssignement) {
    return this.api.post<ResponseAssignement>(
      `/response-assignment/${assignmentId}`, response )
  }

  validateResponseAssignment(
    id: string,
    response: ValidateResponseAssignement,
  ) {
    return this.api.patch<ResponseAssignement>(
      `/response-assignment/validate/${id}`,
      response,
    )
  }
}
