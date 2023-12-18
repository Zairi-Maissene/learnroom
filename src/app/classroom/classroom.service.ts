import { Injectable } from '@angular/core';
import {Student, Teacher} from "../app.service";

export type Classroom = {
  id: string,
  name: string,
  description: string,
  image_id: number,
  students: Student[],
  teacher: Teacher,
  courses: any[]
}
export type CreateClassroom = {
  name: string,
  description: string
}
export type UpdateClassroom = Partial<CreateClassroom>
@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  constructor() { }
}
