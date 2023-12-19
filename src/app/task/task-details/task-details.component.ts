import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {Task, TaskService} from "../task.service";
@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent {
  user: any = {role:"teacher"}
  taskId: string="";
  task$: Observable<Task> = new Observable<Task>();
  editTaskForm: FormGroup = new FormGroup({
    //  points: new FormControl(this.assignment.points),
    // deadline: new FormControl(this.assignment.deadline),
    // content: new FormControl(this.assignment.content)

  });
  editMode:boolean=false;

  constructor(private route: ActivatedRoute,private formBuilder: FormBuilder,private taskServie: TaskService)
  {}

  ngOnInit(): void {
    this.taskId = this.route.snapshot.params['id'];

  }
  getUser: any = () => {
    return {}
  }
  onSubmit: any = () => {
  }

  submitEditTask(){
    this.toggleEditMode()
  }
  deleteTask(){
  }
  toggleEditMode(){
    this.editMode=!this.editMode;
  }

  protected readonly JSON = JSON;
}
