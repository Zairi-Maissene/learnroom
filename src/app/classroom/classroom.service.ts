import {Injectable} from '@angular/core';
import {Student, Teacher} from "../app.service";
import {ApiService} from "../../helpers/helpers";

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
  constructor(private api:ApiService<Classroom>) { }
  // Classroom
  addClassroom(classroom: CreateClassroom) {
    return this.api.post(`/classroom`, classroom)
  }
  getClassroom(id: string) {
    return this.api.get(`/classroom/${id}`)
  }
  updateClassroom(id: string, classroom: UpdateClassroom) {
    return this.api.patch(`/classroom/${id}`, classroom)
  }
  deleteClassroom(id: string) {
    return this.api.remove(`/classroom/${id}`)
  }

  // Course
  getCourses(classroom_id: string) {
    return this.api.get(`/classroom/course/${classroom_id}`)
  }
  // Task
  getTasks(classroom_id: string) {
    return this.api.get(`/classroom/task/${classroom_id}`)
  }
  // Assignment
  getAssignments(classroom_id: string) {
    return this.api.get(`/classroom/assignment/${classroom_id}`)
  }
  // User
  getUsers(classroom_id: string) {
    return this.api.get(`/classroom/users/${classroom_id}`)
  }
  addUser(classroom_id: string, email: string) {
    return this.api.patch(`/classroom/${classroom_id}/${email}`, {})
  }

}
