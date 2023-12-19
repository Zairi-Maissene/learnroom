import { Injectable } from '@angular/core';
import {Course} from "../course/course.service";
import {Student} from "../app.service";

export type Task = {
  id: string,
  name: string,
  content: string,
  points: number,
  course: Course,
  responseTasks: ResponseTask[]
}
export type ResponseTask = {
  id: string,
  completed: boolean,
  task: Task,
  student: Student
}
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor() { }

  getTask():any{

  }
}
