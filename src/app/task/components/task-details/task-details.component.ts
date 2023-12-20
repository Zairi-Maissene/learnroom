import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {ResponseTask, Task, TaskService} from '../../task.service';
import {ResponseAssignement} from "../../../assignment/assignement.service";
@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent implements OnInit {
  user: any = { role: 'student' };
  taskId: string = '';
  task$: Observable<Task> = new Observable<Task>();
  editMode: boolean = false;
  taskIsSubmitted$:Observable<ResponseTask>= new Observable<ResponseTask>();
  taskIsSubmitted:boolean=false
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private taskServie: TaskService,
  ) {}

  ngOnInit(): void {
    this.taskId = this.route.snapshot.params['id'];
    this.task$ = this.taskServie.getTask(this.taskId);
    this.taskIsSubmitted$=this.taskServie.getResponseTask("6df4c61d-6081-4124-88ad-0afc0a4b9954",
      "f486be62-384b-4d97-bf42-3fcf98342cb7")
    if(this.user.role == "student")
    {
      this.taskIsSubmitted$.subscribe(data => {
        if (data && Object.keys(data).length > 0) {
          this.taskIsSubmitted=true
        }
      });
    }
  }
  getUser: any = () => {
    return {};
  };
  onSubmit: any = () => {
    this.taskServie.toggleResponseTask(this.taskId)
    this.taskIsSubmitted=true
  };

  submitEditTask() {}
  deleteTask() {
    this.taskServie.deleteTask(this.taskId);
  }
  toggleEditMode(mode: boolean) {
    this.editMode = mode;
  }
  submitTask() {
    this.taskServie.toggleResponseTask(this.taskId);
  }

}
