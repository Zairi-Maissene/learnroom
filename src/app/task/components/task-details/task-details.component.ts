import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Task, TaskService } from '../../task.service';
@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent implements OnInit {
  user: any = { role: 'student' };
  taskId: string = '';
  task$: Observable<Task> = new Observable<Task>();
  is$: Observable<any> = new Observable<any>();
  editMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private taskServie: TaskService,
  ) {}

  ngOnInit(): void {
    this.taskId = this.route.snapshot.params['id'];
    this.task$ = this.taskServie.getTask(this.taskId);
    this.is$ = this.taskServie.getResponseTask(
      this.taskId,
      'b15f92cb-4cfa-483f-8796-dc9d263318ae',
    );
  }
  getUser: any = () => {
    return {};
  };
  onSubmit: any = () => {
    //  this.taskServie.updateTask(this.taskId,this.submit.value)
  };

  submitEditTask() {}
  deleteTask() {
    this.taskServie.deleteTask(this.taskId);
  }
  toggleEditMode(mode: boolean) {
    this.editMode = mode;
  }
  taskIsCompleted() {
    return true;
    //return this.taskServie.getResponseTask(this.taskId,"b15f92cb-4cfa-483f-8796-dc9d263318ae")
  }
  submitTask() {
    this.taskServie.toggleResponseTask(this.taskId);
  }
  protected readonly JSON = JSON;
  protected readonly console = console;
}
