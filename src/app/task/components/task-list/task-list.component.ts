import {inject, Input} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskFormComponent } from '../../../modals/task-form/task-form.component';
import { Task } from '../../task.service';
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  @Input() tasks : Task[] = [];
  @Input() courseId: string | undefined;
  @Input () inCard:boolean = false;
  @Input () withButton: boolean=false;
  authService = inject(AuthService)// Fictive data, replace with your actual data
  modal = inject(NgbModal);
  onAddTaskClick(): void {
    const modal = this.modal.open(TaskFormComponent)
    modal.componentInstance.courseId = this.courseId
  }
}
