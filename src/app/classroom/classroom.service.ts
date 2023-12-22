import { Injectable } from '@angular/core';
import { ApiService } from '../../helpers/helpers';
import { Student, Teacher, User } from '../auth/auth.service';
import { Course } from '../course/course.service';
import { Task } from '../task/task.service';
import { Assignement } from '../assignment/assignement.service';

export type Classroom = {
  id: string;
  name: string;
  description: string;
  image_id: number;
  students: Student[];
  teacher: Teacher;
  courses: any[];
};
export type CreateClassroom = {
  name: string;
  description: string;
};
export type UpdateClassroom = Partial<CreateClassroom>;
@Injectable({
  providedIn: 'root',
})
export class ClassroomService {
  constructor(private api: ApiService) {}
  // Classroom
  addClassroom(classroom: CreateClassroom, id: string) {
    return this.api.post<Classroom>(`/classroom/${id}`, classroom).subscribe();
  }
  getClassroom(id: string) {
    return this.api.get<Classroom>(`/classroom/${id}`);
  }
  updateClassroom(id: string, classroom: UpdateClassroom) {
    return this.api.patch<Classroom>(`/classroom/${id}`, classroom);
  }
  deleteClassroom(id: string) {
    return this.api.remove(`/classroom/${id}`);
  }

  // Course
  getCourses(classroom_id: string) {
    return this.api.get<Course[]>(`/classroom/course/${classroom_id}`);
  }
  // Task
  getTasks(classroom_id: string) {
    return this.api.get<Task[]>(`/classroom/task/${classroom_id}`);
  }
  // Assignment
  getAssignments(classroom_id: string) {
    return this.api.get<Assignement[]>(`/classroom/assignment/${classroom_id}`);
  }
  // User
  getUsers(classroom_id: string) {
    return this.api.get<User[]>(`/classroom/users/${classroom_id}`);
  }
  addStudent(classroom_id: string, email: string) {
    return this.api.patch<Student>(`/classroom/${classroom_id}/${email}`, {}).subscribe();
  }
}
