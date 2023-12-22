import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assignment-list',
  templateUrl: './assignment-list.component.html',
  styleUrls: ['./assignment-list.component.scss'],
})
export class AssignmentListComponent implements OnInit {
  assignments = [
    {
      id: '1',
      name: 'assignments 1',
      description: 'Description for assignments 1',
    },
    {
      id: '2',
      name: 'assignments 2',
      description: 'Description for assignments 2',
    },
    // Add more tasks as needed
  ];

  ngOnInit(): void {
    this.getAssignments();
  }

  getAssignments(): void {
    // Fictive data, replace with your actual service call
    this.assignments = [
      {
        id: '1',
        name: 'assignments 1',
        description: 'Description for assignments 1',
      },
      {
        id: '2',
        name: 'assignments 2',
        description: 'Description for assignments 2',
      },
      // Add more tasks as needed
    ];
  }
}
