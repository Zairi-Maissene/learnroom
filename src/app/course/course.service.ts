import { Injectable } from '@angular/core';
import {Student, Teacher} from "../app.service";
import {Classroom} from "../classroom/classroom.service";
import {Assignement} from "../assignment/assignement.service";
import {Task} from "../task/task.service";

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

  constructor() { }
}
