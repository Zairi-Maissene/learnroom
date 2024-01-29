import {inject, Input} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Task } from '../../task.service';
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  @Input() tasks : Task[] = [];
  authService = inject(AuthService)// Fictive data, replace with your actual data

}
