import {Injectable} from '@angular/core';
import {Classroom} from "../classroom/classroom.service";
import {Assignement} from "../assignment/assignement.service";
import {Task} from "../task/task.service";
import {ApiService} from "../../helpers/helpers";

export type Course = {
  id: string,
  name: string,
  content: string,
  practices: Assignement[],
  tasks: Task[],
  class: Classroom
}
export type CreateCourse = {
  name: string,
  content: string
}
export type UpdateCourse = Partial<CreateCourse>
@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private api:ApiService<Course>) {}

  // Course
  addCourse(classroom_id:string,course: CreateCourse) {
    return this.api.post(`/course/${classroom_id}`, course)
  }
  getCourse(id: string) {
    return this.api.get(`/course/${id}`)
  }
  updateCourse(id: string, course: UpdateCourse) {
    return this.api.patch(`/course/${id}`, course)
  }
  deleteCourse(id: string) {
    return this.api.remove(`/course/${id}`)
  }
  // Task
  getTasks(course_id: string) {
    return this.api.get(`/course/task/${course_id}`)
  }
  // Assignment
  getAssignments(course_id: string) {
    return this.api.get(`/course/assignment/${course_id}`)
  }
}
