import { Injectable } from '@angular/core';
import {Classroom} from "./classroom/classroom.service";

export type Teacher = {
  id: string,
  email: string,
  name: string,
  avatar_color: string,
  classes: Classroom[]
}

export type Student = {
  id: string,
  email: string,
  name: string,
  avatar_color: string,
  classes: Classroom[],
  responseTasks: any[],
  responseAssignments: any[]
}
@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }
}
