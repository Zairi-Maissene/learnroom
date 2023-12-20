import { Injectable } from '@angular/core';
import { ApiService } from '../../helpers/helpers';
import { Observable } from 'rxjs';
import { Student, Teacher } from '../auth/auth.service';

export type Assignement = {
  id: string;
  name: string;
  content: string;
  deadline: string;
  points: number;
  course: any;
  responseAssignments: ResponseAssignement[];
  teacher: Teacher;
};
export type ResponseAssignement = {
  id: string;
  content: string;
  score: number;
  assignment: Assignement;
  student: Student;
};
export type CreateAssignement = {
  name: string;
  content: string;
  deadline: string;
  points: number;
};
export type UpdateAssignement = Partial<CreateAssignement>;

export type UpdateResponseAssignement = {
  content: string;
};

export type ValidateResponseAssignement = {
  score: number;
};

@Injectable({
  providedIn: 'root',
})
export class AssignementService {
  constructor(private api: ApiService) {}
  // Assignment
  addAssignement(course_id: string, assignement: CreateAssignement) {
    return this.api.post<Assignement>(`/assignment/${course_id}`, assignement);
  }
  getAssignment(id: string): Observable<Assignement> {
    return this.api.get<Assignement>(`/assignment/${id}`);
  }
  updateAssignment(id: string, assignement: UpdateAssignement) {
    return this.api.patch<Assignement>(`/assignment/${id}`, assignement);
  }
  deleteAssignment(id: string) {
    return this.api.remove(`/assignment/${id}`);
  }

  // ResponseAssignment

  getResponseAssignment(assignment_id: string, student_id: string) {
    return this.api.get<ResponseAssignement>(
      `/response_assignment/${assignment_id}/${student_id}`,
    );
  }

  updateResponseAssignment(id: string, response: UpdateResponseAssignement) {
    return this.api.patch<ResponseAssignement>(
      `/response_assignment/${id}`,
      response,
    );
  }

  validateResponseAssignment(
    id: string,
    response: ValidateResponseAssignement,
  ) {
    return this.api.patch<ResponseAssignement>(
      `/response_assignment/validate/${id}`,
      response,
    );
  }
}
