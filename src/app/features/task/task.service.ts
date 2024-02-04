import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CreateTask, Task, UpdateTask } from '@core/models/task.model';
import { ApiService } from '@core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private api: ApiService) {}

  // Task
  addTask(course_id: string, task: CreateTask) {
    return this.api.post(`/task/${course_id}`, task);
  }
  getTask(id: string): Observable<Task> {
    return this.api.get(`/task/${id}`);
  }
  updateTask(id: string, task: UpdateTask){
  return this.api.patch(`/task/${id}`, task);

  }
  deleteTask(id: string) {
    return this.api.remove(`/task/${id}`)
  }
  // ResponseTask
  getResponseTask(task_id: string): Observable<any> {
    return this.api.get(`/response-task/${task_id}`);
  }
  toggleResponseTask(taskId: string,studentId: string) {
    return this.api.patch(`/response-task/${taskId}/${studentId}`, {})
  }
}
