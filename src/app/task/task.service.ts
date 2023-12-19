import {Injectable} from '@angular/core';
import {Course} from "../course/course.service";
import {ApiService} from "../../helpers/helpers";
import {Student} from "../auth/auth.service";

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
export type CreateTask = {
  name: string,
  content: string,
  points: number
}
export type UpdateTask = Partial<CreateTask>
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private api:ApiService<Task>) { }

  // Task
  addTask(course_id:string,task: CreateTask) {
    return this.api.post(`/task/${course_id}`, task)
  }
  getTask(id: string) {
    return this.api.get(`/task/${id}`)
  }
  updateTask(id: string, task: UpdateTask) {
    return this.api.patch(`/task/${id}`, task)
  }
  deleteTask(id: string) {
    return this.api.remove(`/task/${id}`)
  }
  // ResponseTask
  getResponseTask(task_id:string,student_id:string) {
    return this.api.get(`/response_task/${task_id}/${student_id}`)
  }
  toggleResponseTask(id:string) {
    return this.api.patch(`/response_task/${id}`, {})
  }

}
