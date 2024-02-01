import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable, tap} from 'rxjs';
import {ResponseTask, Task, TaskService} from '../../task.service';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EditTaskFormComponent} from "../../../modals/edit-task-form/edit-task-form.component";
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent implements OnInit {
  taskId: string = '';
  task$: Observable<Task> = new Observable<Task>();
  task : Task = {} as Task;
  editMode: boolean = false;
  taskIsSubmitted$:Observable<ResponseTask>= new Observable<ResponseTask>();
  taskIsSubmitted:boolean=false
  modalService = inject(NgbModal);
  isTeacher : boolean = false;
  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    public authService : AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(tap(param=>{
      this.taskId = param['id']
      this.taskService.getTask(this.taskId).pipe(
        tap(task => {console.log("task",task);this.task = task})
      ).subscribe();
      this.taskIsSubmitted$=this.taskService.getResponseTask(this.taskId)
      if(!this.authService.isTeacher$)
      {
        this.taskIsSubmitted$.subscribe(data => {
          if (data && Object.keys(data).length > 0) {
            this.taskIsSubmitted=true
          }
        });
      }
      this.authService.isTeacher$.subscribe((user) => {
        this.isTeacher = user;
        }
      );
    })).subscribe();
    
    

  }

  onSubmit: any = () => {
    this.taskService.toggleResponseTask(this.taskId)
    this.taskIsSubmitted=true
  };

  submitEditTask() {}
  deleteTask() {
    this.taskService.deleteTask(this.taskId);
  }
  editTask(formValues : any)
  {
    this.taskService.updateTask(this.taskId, formValues)
    this.taskService.getTask(this.taskId).pipe(
      tap(res => {this.task = res})
    ).subscribe()

  }
  toggleEditMode(mode: boolean) {
    this.editMode = mode;
    const modal = this.modalService.open(EditTaskFormComponent)
    modal.componentInstance.task = this.task;
    modal.componentInstance.taskId = this.taskId;
    modal.componentInstance.editForm.subscribe((emmitedValue:any) => {
      this.task=emmitedValue
      this.editTask(emmitedValue)
    });

    }
  submitTask() {
    this.taskService.toggleResponseTask(this.taskId);
  }

}
