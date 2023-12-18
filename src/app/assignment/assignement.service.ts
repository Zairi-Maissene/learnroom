import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignementService {
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
  assignements:any[]=[
    {
    points:20,
    deadline: new Date(),
    course:
      {name: "Maths",
        teacher:
          {name: "Mme. Dupont",
            email: ""}
      },
    responseAssignments: [],

  },
    {
      points:20,
      deadline: new Date(),
      course:
        {name: "Maths",
          teacher:
            {name: "Mme. Dupont",
              email: ""}
        },
      responseAssignments: [],

    },
    {
      points:20,
      deadline: new Date(),
      course:
        {name: "Maths",
          teacher:
            {name: "Mme. Dupont",
              email: ""}
        },
      responseAssignments: [],

    },
    {
      points:20,
      deadline: new Date(),
      course:
        {name: "Maths",
          teacher:
            {name: "Mme. Dupont",
              email: ""}
        },
      responseAssignments: [],

    },
    {
      points:20,
      deadline: new Date(),
      course:
        {name: "Maths",
          teacher:
            {name: "Mme. Dupont",
              email: ""}
        },
      responseAssignments: [],

    },
    {
      points:20,
      deadline: new Date(),
      course:
        {name: "Maths",
          teacher:
            {name: "Mme. Dupont",
              email: ""}
        },
      responseAssignments: [],

    },

  ]

  //constructor(private http: HttpClient) {}
  constructor() {}
  getAssignments(id: string):any[] {
    return this.assignements;
  }
  getAssignement(id: string):any {
    return this.assignement;
  }
}
