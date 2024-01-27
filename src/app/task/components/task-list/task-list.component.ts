import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Task } from '../../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  @Input() tasks : Task[] = []; // Fictive data, replace with your actual data
}
