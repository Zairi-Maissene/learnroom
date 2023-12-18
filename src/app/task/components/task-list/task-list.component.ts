import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit{
  tasks: any = []; // Fictive data, replace with your actual data

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    // Fictive data, replace with your actual service call
    this.tasks = [
      { id: '1', name: 'Task 1', description: 'Description for Task 1' },
      { id: '2', name: 'Task 2', description: 'Description for Task 2' },
      // Add more tasks as needed
    ];
  }

}
