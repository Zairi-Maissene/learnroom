import { Injectable } from '@angular/core';
import { Classroom } from '../classroom/classroom.service';
import { Assignement } from '../assignment/assignement.service';
import { Task } from '../task/task.service';
import { ApiService } from '../../helpers/helpers';

export type Course = {
  id: string;
  name: string;
  content: string;
  practices: Assignement[];
  tasks: Task[];
  class: Classroom;
};
export type CreateCourse = {
  name: string;
  content: string;
};
export type UpdateCourse = Partial<CreateCourse>;
@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private api: ApiService) {}

  // Course
  addCourse(classroom_id: string, course: CreateCourse) {
    return this.api.post<Course>(`/course/${classroom_id}`, course).subscribe();
  }
  getCourse(id: string) {
    return this.api.get<Course>(`/course/${id}`);
  }
  updateCourse(id: string, course: UpdateCourse) {
    return this.api.patch<Course>(`/course/${id}`, course).subscribe();
  }
  deleteCourse(id: string) {
    return this.api.remove(`/course/${id}`);
  }
  // Task
  getTasks(course_id: string) {
    return this.api.get<Task[]>(`/course/task/${course_id}`);
  }
  // Assignment
  getAssignments(course_id: string) {
    return this.api.get<Assignement[]>(`/course/assignment/${course_id}`);
  }
  // Search
  search(searchTerm: string, classroomId: string) {
    return this.api.get<Course[]>(`/course/search?query=${searchTerm}&classroomId=${classroomId}`);
  }
}