import { Injectable } from '@angular/core';
import {Student} from "../app.service";

export type Assignement = {
  id: string,
  name: string,
  content: string,
  deadline: string,
  points: number,
  course: any,
  responseAssignments: ResponseAssignement[]
}
export type ResponseAssignement = {
  id: string,
  content: string,
  score: number,
  assignment: Assignement,
  student: Student
}
export type CreateAssignement = {
  name: string,
  content: string,
  deadline: string,
  points: number
}
export type UpdateAssignement = Partial<CreateAssignement>

@Injectable({
  providedIn: 'root'
})
export class AssignementService {
  assignement: any = {
    id:1,
    name: "Maths exercice 2",
    points:20,
    deadline: new Date(),
    course:
      {name: "Maths"},
    teacher:
      {name: "Mme. Dupont",
        email: ""},
    responseAssignments: [],
    content:"assignment systèmes temps réel",

  }
  assignements:any[]=[
    {
    name: "Maths exercice 2",
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
  submitInAssignement(data:any):any {

  }
  editAssignement(id:string,data:any):any {}
  deleteAssignement(id:string):any {}
}
