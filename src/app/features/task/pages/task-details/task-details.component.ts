import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Observable, switchMap, tap} from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditTaskFormComponent } from '@features/task/components/edit-task-form/edit-task-form.component';
import { AuthPersistence } from '@core/services/auth.persistence';
import { ResponseTask, Task } from '@core/models/task.model';
import { TaskService } from '@features/task/task.service';
import {FormBuilder} from "@angular/forms";
import {TaskFormComponent} from "@features/task/components/task-form/task-form.component";

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent implements OnInit {
  taskId: string = '';
  //task$: Observable<Task> = new Observable<Task>();
  task: Task = {} as Task;
  editMode: boolean = false;
  taskIsSubmitted$: Observable<ResponseTask> = new Observable<ResponseTask>();
  taskIsSubmitted: boolean = false;
  modalService = inject(NgbModal);
  isTeacher: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    public authService: AuthPersistence,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        tap((param) => {
          this.taskId = param['id'];
          this.taskService
            .getTask(this.taskId)
            .pipe(
              tap((task) => {

                this.task = task;
              }),
            )
            .subscribe();
          this.taskIsSubmitted$ = this.taskService.getResponseTask(this.taskId);
          if (!this.authService.isTeacher$) {
            this.taskIsSubmitted$.subscribe((data) => {
              if (data && Object.keys(data).length > 0) {
                this.taskIsSubmitted = true;
              }
            });
          }
          this.authService.isTeacher$.subscribe((user) => {
            this.isTeacher = user;
          });
        }),
      )
      .subscribe();
  }

  onSubmit: any = () => {
    this.taskService.toggleResponseTask(this.taskId);
    this.taskIsSubmitted = true;
  };

  deleteTask() {
    this.taskService.deleteTask(this.taskId);
    this.router.navigate(['/classroom']);
  }
  editTask(formValues: any) {
    this.taskService.updateTask(this.taskId, formValues)
      .pipe(
        switchMap(() =>
          this.taskService.getTask(this.taskId),
        ),
      )
      .subscribe((res) => {
         this.task = res;
      });

  }
  toggleEditMode(mode: boolean) {
    this.editMode = mode;
    const modal = this.modalService.open(TaskFormComponent);
    modal.componentInstance.task = this.task;
    modal.componentInstance.taskId = this.taskId;
    modal.componentInstance.isEditing = true;
    modal.componentInstance.submit.subscribe((emittedValue: any) => {
      this.editTask(emittedValue);
    });
  }
  submitTask() {
    this.taskService.toggleResponseTask(this.taskId);
    this.taskIsSubmitted = true;
  }
}
