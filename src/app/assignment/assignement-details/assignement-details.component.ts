import { Component } from '@angular/core';

@Component({
  selector: 'app-assignement-details',
  templateUrl: './assignement-details.component.html',
  styleUrls: ['./assignement-details.component.sass']
})
export class AssignementDetailsComponent {
  assignement: any = {
    points:20,
    deadline: new Date(),
    course:
      {name: "Maths",
        teacher:
          {name: "Mme. Dupont",
            email: ""}
      },
    responseAssignments: [],

  }
  constructor() { }

  ngOnInit(): void {
  }

}
